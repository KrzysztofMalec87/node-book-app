import supertest from 'supertest';
import app from '@/app';
import { ApiVersion, Endpoint } from '@/constants/endpoints';

const loginEndpoint = `${ApiVersion.V1}${Endpoint.LOGIN}`;
const regenerateTokenEndpoint = `${ApiVersion.V1}${Endpoint.REGENERATE_TOKEN}`;

describe(`POST ${regenerateTokenEndpoint}`, () => {
    it('should respond with a message for valid token regeneration', async () => {
        const loginResponse = await supertest(app).post(loginEndpoint).send({
            username: 'test',
            password: 'test',
        });

        const regenerateTokenReponse = await supertest(app).post(regenerateTokenEndpoint).send({
            refreshToken: loginResponse.body.data.refreshToken,
        });

        expect(regenerateTokenReponse.statusCode).toBe(200);
        expect(regenerateTokenReponse.body.data).toHaveProperty('accessToken');
        expect(typeof regenerateTokenReponse.body.data.accessToken).toBe('string');

        expect(regenerateTokenReponse.body).toEqual(
            expect.objectContaining({ message: 'Token created successfully' }),
        );
    });

    it('should respond with a message for invalid token refresh token', async () => {
        const response = await supertest(app).post(regenerateTokenEndpoint).send({
            refreshToken: 'invalidRefreshToken',
        });

        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual(expect.objectContaining({ message: 'Invalid token' }));
    });

    it('should respond with a message for invalid payload', async () => {
        const response = await supertest(app).post(regenerateTokenEndpoint).send({
            invalidBodyKey: 'invalidRefreshToken',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({ message: 'Incorrect payload' }));
    });
});
