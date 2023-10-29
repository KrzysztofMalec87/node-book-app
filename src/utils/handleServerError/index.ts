import type { Response } from 'express';
import { sendResponse } from '@/utils/sendRespons';
import { ResponseCodes } from '@/constants/responseCodes';
import { ResponseMessages } from '@/constants/responseMessages';

export const handleServerError = (error: unknown, res: Response) => {
    console.error(error);

    return sendResponse({
        res,
        status: ResponseCodes.INTERNAL_SERVER_ERROR,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
    });
};
