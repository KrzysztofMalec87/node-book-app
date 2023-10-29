export const ResponseMessages = Object.freeze({
    ACCESS_DENIED: 'Access Denied',
    BOOKS_RETRIEVED: 'Books retrieved successfully',
    BOOK_ADDED: 'Book added successfully',
    BOOK_REMOVED: 'Book removed successfully',
    INCORRECT_PAYLOAD: 'Incorrect payload',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    INVALID_TOKEN: 'Invalid token',
    INVALID_TOKEN_TYPE: 'Invalid token type',
    LOGIN_INVALID_CREDENTIALS: 'Invalid login credentials',
    LOGIN_SUCCESS: 'Logged in successfully',
    REGISTERED_SUCCESSFULLY: 'Registered successfully',
    TOKEN_CREATED: 'Token created successfully',
    USER_ALREADY_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'Username not found',
});

export type IResponseMessages = (typeof ResponseMessages)[keyof typeof ResponseMessages];
