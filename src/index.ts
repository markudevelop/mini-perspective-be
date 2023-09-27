import express, { Express } from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

export const app: Express = express();

app.use(express.json());

export const startServer = async (port = process.env.PORT || 3111) => {
    // Provided mongodb URI
    let mongoUri = process.env.MONGODB_URI;

    // For development only in memory server
    if (!mongoUri && ['test', 'development'].includes(process.env.NODE_ENV)) {
        // If in development environment, use in-memory MongoDB server
        const mongod = await MongoMemoryServer.create();
        mongoUri = await mongod.getUri();
    }

    // Connect to the MongoDB server using Mongoose
    await mongoose.connect(mongoUri, {});

    app.use('/api', userRoutes);
    app.use(errorHandler);

    return app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};

if (process.env.NODE_ENV !== 'test') {
    startServer().then((server) => {
        const address = server.address();
        const port = typeof address === 'string' ? address : address?.port;
        console.log(`Server is running at http://localhost:${port}`);
    });
}
