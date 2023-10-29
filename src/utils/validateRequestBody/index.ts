import { Response } from 'express';
import { IValidateZodSchema, validateZodSchema } from '@/utils/validateZodSchema';
import { ResponseCodes } from '@/constants/responseCodes';
import { ResponseMessages } from '@/constants/responseMessages';
import { sendResponse } from '@/utils/sendRespons';

interface IValidateRequestBody extends IValidateZodSchema {
    res: Response;
}

export const validateRequestBody = <T extends object>({
    dto,
    schema,
    res,
}: IValidateRequestBody): T | null => {
    try {
        return validateZodSchema<T>({ dto, schema });
    } catch (err) {
        console.log(err);

        sendResponse({
            res,
            status: ResponseCodes.BAD_REQUEST,
            message: ResponseMessages.INCORRECT_PAYLOAD,
        });

        return null;
    }
};
