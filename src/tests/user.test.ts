import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { app, startServer } from '../index'; // Import your app

let server: any;
const name = 'Markus Barkus';

describe('User Endpoints', () => {
    beforeAll(async () => {
        server = await startServer(4000);
    });

    afterAll(async () => {
        await server.close();
    });

    describe('POST /users', () => {
        it('should create a new user and return 201 status', async () => {
            const res = await request(app).post('/api/users').send({
                name,
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body.name).toEqual(name);
        });
    });

    describe('GET /users', () => {
        it('should return all users and return 200 status', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBeGreaterThanOrEqual(0);
        });
    });
});
