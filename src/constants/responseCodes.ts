export const ResponseCodes = Object.freeze({
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
});

export type IResponseCodes = (typeof ResponseCodes)[keyof typeof ResponseCodes];
