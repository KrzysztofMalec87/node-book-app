import jwt from 'jsonwebtoken';
import { ITokenTypes, TokenTypes } from '@/constants/tokenTypes';

interface ICreateTokens {
    (
        userId: string,
        tokenSecret: string,
        tokenType: ITokenTypes,
    ): { accessToken?: string; refreshToken?: string };
}

export const createTokens: ICreateTokens = (userId, tokenSecret, tokenType) => {
    const tokens: ReturnType<typeof createTokens> = {};

    if (tokenType === TokenTypes.ACCESS || tokenType === TokenTypes.BOTH) {
        tokens.accessToken = jwt.sign({ id: userId, type: TokenTypes.ACCESS }, tokenSecret, {
            expiresIn: '5m',
        });
    }

    if (tokenType === TokenTypes.REFRESH || tokenType === TokenTypes.BOTH) {
        tokens.refreshToken = jwt.sign({ id: userId, type: TokenTypes.REFRESH }, tokenSecret, {
            expiresIn: '7d',
        });
    }

    return tokens;
};
