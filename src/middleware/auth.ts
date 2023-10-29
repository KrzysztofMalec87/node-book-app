import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendResponse } from '@/utils/sendRespons';
import { ResponseCodes } from '@/constants/responseCodes';
import { ResponseMessages } from '@/constants/responseMessages';
import { getToken } from '@/utils/getToken';
import { TokenTypes } from '@/constants/tokenTypes';

const auth = (req: JwtPayload, res: Response, next: NextFunction) => {
    const secret = process.env.TOKEN_SECRET;

    if (!secret) {
        console.error('TOKEN_SECRET is not defined');

        return sendResponse({
            res,
            status: ResponseCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessages.INTERNAL_SERVER_ERROR,
        });
    }

    const token = getToken(req);

    if (!token) {
        return sendResponse({
            res,
            status: ResponseCodes.UNAUTHORIZED,
            message: ResponseMessages.ACCESS_DENIED,
        });
    }

    try {
        const decodedToken = jwt.verify(token, secret) as JwtPayload;

        if (decodedToken.type !== TokenTypes.ACCESS) {
            return sendResponse({
                res,
                status: ResponseCodes.BAD_REQUEST,
                message: ResponseMessages.INVALID_TOKEN_TYPE,
            });
        }

        req.user = decodedToken;

        next();
    } catch (err) {
        return sendResponse({
            res,
            status: ResponseCodes.BAD_REQUEST,
            message: ResponseMessages.INVALID_TOKEN,
        });
    }
};

export default auth;
