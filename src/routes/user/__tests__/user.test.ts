import supertest from 'supertest';
import app from '@/app';
import { ApiVersion, Endpoint } from '@/constants/endpoints';

const loginEndpoint = `${ApiVersion.V1}${Endpoint.LOGIN}`;
const registerEndpoint = `${ApiVersion.V1}${Endpoint.REGISTER}`;

describe(`POST ${loginEndpoint}`, () => {
    it('should respond with a message for invalid username', async () => {
        const response = await supertest(app).post(loginEndpoint).send({
            username: 'invalidUser',
            password: 'invalidPassword',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({ message: 'Username not found' }));
    });

    it('should respond with a message for invalid password', async () => {
        const response = await supertest(app).post(loginEndpoint).send({
            username: 'test',
            password: 'invalidPassword',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({ message: 'Invalid login credentials' }),
        );
    });

    it('should respond with a message for invalid payload', async () => {
        const response = await supertest(app).post(loginEndpoint).send({
            user: 'test',
            password: 'invalidPassword',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({ message: 'Incorrect payload' }));
    });

    it('should respond correctly for a valid login', async () => {
        const response = await supertest(app).post(loginEndpoint).send({
            username: 'test',
            password: 'test',
        });

        expect(response.statusCode).toBe(200);

        expect(response.body.data).toHaveProperty('accessToken');
        expect(typeof response.body.data.accessToken).toBe('string');
        expect(response.body.data).toHaveProperty('refreshToken');
        expect(typeof response.body.data.refreshToken).toBe('string');

        expect(response.body).toEqual(
            expect.objectContaining({ message: 'Logged in successfully' }),
        );
    });
});

describe(`POST ${registerEndpoint}`, () => {
    it('should respond with a message for invalid payload', async () => {
        const response = await supertest(app).post(registerEndpoint).send({
            user: 'invalidUser',
            password: 'invalidPassword',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({ message: 'Incorrect payload' }));
    });

    it('should respond with a message for user that already exist', async () => {
        const response = await supertest(app).post(registerEndpoint).send({
            username: 'test',
            password: 'test',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({ message: 'User already exists' }));
    });

    it('should respond correctly for a valid registration', async () => {
        const response = await supertest(app).post(registerEndpoint).send({
            username: 'newUser',
            password: 'newUser',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({ message: 'Registered successfully' }),
        );
    });
});
