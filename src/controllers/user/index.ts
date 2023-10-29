import { Response, Request } from 'express';
import User from '@/models/user';
import { sendResponse } from '@/utils/sendRespons';
import { ResponseCodes } from '@/constants/responseCodes';
import { ResponseMessages } from '@/constants/responseMessages';
import { handleServerError } from '@/utils/handleServerError';
import { createTokens } from '@/utils/createTokens';
import { TokenTypes } from '@/constants/tokenTypes';
import { validateRequestBody } from '@/utils/validateRequestBody';
import { UserPayloadBodyDto, UserPayloadBodySchema } from '@/controllers/user/validate';

export const registerUser = async (req: Request, res: Response) => {
    const tokenSecret = process.env.TOKEN_SECRET;

    if (!tokenSecret) {
        return sendResponse({
            res,
            status: ResponseCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessages.INTERNAL_SERVER_ERROR,
        });
    }

    const validatedBody = validateRequestBody<UserPayloadBodyDto>({
        dto: req.body,
        schema: UserPayloadBodySchema,
        res,
    });

    if (!validatedBody) {
        return;
    }

    const { username, password } = validatedBody;

    try {
        const isUserExist = await User.findOne({ username });

        if (isUserExist) {
            return sendResponse({
                res,
                status: ResponseCodes.BAD_REQUEST,
                message: ResponseMessages.USER_ALREADY_EXISTS,
            });
        }
    } catch (err) {
        handleServerError(err, res);
    }

    const user = new User({ username, password });

    try {
        await user.save();

        return sendResponse({
            res,
            status: ResponseCodes.OK,
            message: 'Registered successfully',
        });
    } catch (err) {
        handleServerError(err, res);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const tokenSecret = process.env.TOKEN_SECRET;

    if (!tokenSecret) {
        return sendResponse({
            res,
            status: ResponseCodes.INTERNAL_SERVER_ERROR,
            message: ResponseMessages.INTERNAL_SERVER_ERROR,
        });
    }

    const validatedBody = validateRequestBody<UserPayloadBodyDto>({
        dto: req.body,
        schema: UserPayloadBodySchema,
        res,
    });

    if (!validatedBody) {
        return;
    }

    const { username, password } = validatedBody;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return sendResponse({
                res,
                status: ResponseCodes.BAD_REQUEST,
                message: ResponseMessages.USER_NOT_FOUND,
            });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return sendResponse({
                res,
                status: ResponseCodes.BAD_REQUEST,
                message: ResponseMessages.LOGIN_INVALID_CREDENTIALS,
            });
        }

        const tokens = createTokens(user.id, tokenSecret, TokenTypes.BOTH);

        sendResponse({
            res,
            status: ResponseCodes.OK,
            message: ResponseMessages.LOGIN_SUCCESS,
            data: { ...tokens },
        });
    } catch (err) {
        handleServerError(err, res);
    }
};
