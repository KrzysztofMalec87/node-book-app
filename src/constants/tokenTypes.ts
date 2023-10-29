export const TokenTypes = Object.freeze({
    ACCESS: 'ACCESS',
    REFRESH: 'REFRESH',
    BOTH: 'BOTH',
});

export type ITokenTypes = (typeof TokenTypes)[keyof typeof TokenTypes];
