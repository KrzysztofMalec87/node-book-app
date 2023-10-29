import type { Response } from 'express';
import type { IResponseCodes } from '@/constants/responseCodes';
import type { IResponseMessages } from '@/constants/responseMessages';

interface ISendResponse<T> {
    res: Response;
    status: IResponseCodes;
    data?: T;
    message: IResponseMessages;
}

export const sendResponse = <T extends object>({
    res,
    status,
    message,
    data,
}: ISendResponse<T>) => {
    res.status(status).json({ message, data });
};
