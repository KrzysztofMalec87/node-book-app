import type { Response, Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendResponse } from '@/utils/sendRespons';
import { ResponseCodes } from '@/constants/responseCodes';
import { ResponseMessages } from '@/constants/responseMessages';
import { validateRequestBody } from '@/utils/validateRequestBody';
import {
    RegenerateTokenBodyDto,
    RegenerateTokenBodySchema,
} from '@/controllers/regenerateToken/validate';
import { createTokens } from '@/utils/createTokens';
import { TokenTypes } from '@/constants/tokenTypes';

export const regenerateToken = async (req: Request, res: Response) => {
    const tokenSecret = process.env.TOKEN_SECRET;

    if (!tokenSecret) {
        return sendResponse({
            res,
            status: ResponseCodes.UNAUTHORIZED,
            message: ResponseMessages.INVALID_TOKEN,
        });
    }

    const validatedBody = validateRequestBody<RegenerateTokenBodyDto>({
        dto: req.body,
        schema: RegenerateTokenBodySchema,
        res,
    });

    if (!validatedBody) {
        return;
    }

    const { refreshToken } = validatedBody;

    let decodedToken;

    try {
        decodedToken = jwt.verify(refreshToken, tokenSecret) as JwtPayload;
    } catch (err) {
        console.log(err);

        return sendResponse({
            res,
            status: ResponseCodes.UNAUTHORIZED,
            message: ResponseMessages.INVALID_TOKEN,
        });
    }

    if (decodedToken.type !== TokenTypes.REFRESH) {
        return sendResponse({
            res,
            status: ResponseCodes.UNAUTHORIZED,
            message: ResponseMessages.INVALID_TOKEN_TYPE,
        });
    }

    const newAccessToken = createTokens(decodedToken.id, tokenSecret, TokenTypes.ACCESS);

    return sendResponse({
        res,
        status: ResponseCodes.OK,
        message: ResponseMessages.TOKEN_CREATED,
        data: { ...newAccessToken },
    });
};
