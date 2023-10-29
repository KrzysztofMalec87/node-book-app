import supertest from 'supertest';
import app from '@/app';
import { ApiVersion, Endpoint } from '@/constants/endpoints';

const loginEndpoint = `${ApiVersion.V1}${Endpoint.LOGIN}`;
const booksEndpoint = `${ApiVersion.V1}${Endpoint.BOOKS}`;
const booksAddEndpoint = `${ApiVersion.V1}${Endpoint.BOOK_ADD}`;
const booksRemoveEndpoint = `${ApiVersion.V1}${Endpoint.BOOK_REMOVE}`;

const loginUser = async (username = 'test', password = 'test') => {
    const response = await supertest(app).post(loginEndpoint).send({ username, password });
    return response.body.data.accessToken;
};

describe(`GET ${booksEndpoint}`, () => {
    let accessToken: string;

    beforeAll(async () => {
        accessToken = await loginUser();
    });

    it('should respond with a message for invalid access', async () => {
        const booksReponse = await supertest(app).get(booksEndpoint);

        expect(booksReponse.statusCode).toBe(401);

        expect(booksReponse.body).toEqual(expect.objectContaining({ message: 'Access Denied' }));
    });

    it('should respond with a message for invalid token', async () => {
        const booksReponse = await supertest(app)
            .get(booksEndpoint)
            .set('auth-token', 'invalidToken');

        expect(booksReponse.statusCode).toBe(400);

        expect(booksReponse.body).toEqual(expect.objectContaining({ message: 'Invalid token' }));
    });

    it('should respond with book list', async () => {
        const booksResponse = await supertest(app)
            .get(booksEndpoint)
            .set('auth-token', accessToken);

        expect(booksResponse.statusCode).toBe(200);

        expect(booksResponse.body).toEqual(
            expect.objectContaining({
                data: expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        description: 'Description for Book1',
                        name: 'Book1',
                    }),
                    expect.objectContaining({
                        _id: expect.any(String),
                        description: 'Description for Book2',
                        name: 'Book2',
                    }),
                ]),
                message: 'Books retrieved successfully',
            }),
        );
    });
});

describe(`POST ${booksAddEndpoint}`, () => {
    let accessToken: string;

    beforeAll(async () => {
        accessToken = await loginUser();
    });

    it('should respond with a message for invalid access', async () => {
        const booksAddReponse = await supertest(app).post(booksAddEndpoint);

        expect(booksAddReponse.statusCode).toBe(401);

        expect(booksAddReponse.body).toEqual(expect.objectContaining({ message: 'Access Denied' }));
    });

    it('should respond with a message for invalid token', async () => {
        const booksAddReponse = await supertest(app)
            .post(booksAddEndpoint)
            .send({
                name: 'Book3',
                description: 'Description for Book3',
            })
            .set('auth-token', 'invalidToken');

        expect(booksAddReponse.statusCode).toBe(400);

        expect(booksAddReponse.body).toEqual(expect.objectContaining({ message: 'Invalid token' }));
    });

    it('should respond with a message for invalid payload', async () => {
        const booksAddReponse = await supertest(app)
            .post(booksAddEndpoint)
            .send({
                name: 'Book3',
                description: 'Description for Book3',
                stage: 'stage 1',
            })
            .set('auth-token', accessToken);

        expect(booksAddReponse.statusCode).toBe(400);

        expect(booksAddReponse.body).toEqual(
            expect.objectContaining({ message: 'Incorrect payload' }),
        );
    });

    it('should respond with a message for valid book add', async () => {
        const booksAddReponse = await supertest(app)
            .post(booksAddEndpoint)
            .send({
                name: 'Book3',
                description: 'Description for Book3',
            })
            .set('auth-token', accessToken);

        expect(booksAddReponse.statusCode).toBe(200);

        expect(booksAddReponse.body).toEqual(
            expect.objectContaining({ message: 'Book added successfully' }),
        );
    });
});

describe(`POST ${booksRemoveEndpoint}`, () => {
    let accessToken: string;

    beforeAll(async () => {
        accessToken = await loginUser();
    });

    it('should respond with a message for invalid access', async () => {
        const booksRemoveReponse = await supertest(app).post(booksRemoveEndpoint);

        expect(booksRemoveReponse.statusCode).toBe(401);

        expect(booksRemoveReponse.body).toEqual(
            expect.objectContaining({ message: 'Access Denied' }),
        );
    });

    it('should respond with a message for invalid token', async () => {
        const booksRemoveReponse = await supertest(app)
            .post(booksRemoveEndpoint)
            .send({
                name: 'Book3',
                description: 'Description for Book3',
            })
            .set('auth-token', 'invalidToken');

        expect(booksRemoveReponse.statusCode).toBe(400);

        expect(booksRemoveReponse.body).toEqual(
            expect.objectContaining({ message: 'Invalid token' }),
        );
    });

    it('should respond with a message for valid book remove', async () => {
        const booksRemoveReponse = await supertest(app)
            .post(booksRemoveEndpoint)
            .send({
                invalidBodyKey: 'id',
            })
            .set('auth-token', accessToken);

        expect(booksRemoveReponse.statusCode).toBe(400);

        expect(booksRemoveReponse.body).toEqual(
            expect.objectContaining({ message: 'Incorrect payload' }),
        );
    });

    it('should respond with a message for valid book remove', async () => {
        const booksList = await supertest(app).get(booksEndpoint).set('auth-token', accessToken);

        const booksRemoveReponse = await supertest(app)
            .post(booksRemoveEndpoint)
            .send({
                bookId: booksList.body.data[0]._id,
            })
            .set('auth-token', accessToken);

        expect(booksRemoveReponse.statusCode).toBe(200);

        expect(booksRemoveReponse.body).toEqual(
            expect.objectContaining({ message: 'Book removed successfully' }),
        );
    });
});
