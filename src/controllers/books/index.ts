import type { Response, Request } from 'express';
import Books from '@/models/books';
import { getUserId } from '@/utils/getUserId';
import { sendResponse } from '@/utils/sendRespons';
import { ResponseCodes } from '@/constants/responseCodes';
import { ResponseMessages } from '@/constants/responseMessages';
import { handleServerError } from '@/utils/handleServerError';
import { validateZodSchema } from '@/utils/validateZodSchema';
import {
    AddBookBodyDto,
    AddBookBodySchema,
    GetBooksDto,
    GetBooksShema,
    RemoveBookBodyDto,
    RemoveBookBodySchema,
} from '@/controllers/books/validate';
import { validateRequestBody } from '@/utils/validateRequestBody';

export const getBooks = async (req: Request, res: Response) => {
    const userId = getUserId(req);

    if (!userId) {
        return sendResponse({
            res,
            status: ResponseCodes.UNAUTHORIZED,
            message: ResponseMessages.ACCESS_DENIED,
        });
    }

    try {
        const data = await Books.find({ userId });
        const dto = validateZodSchema<GetBooksDto>({
            dto: data,
            schema: GetBooksShema,
        });

        return sendResponse({
            res,
            status: ResponseCodes.OK,
            message: ResponseMessages.BOOKS_RETRIEVED,
            data: dto,
        });
    } catch (err) {
        handleServerError(err, res);
    }
};

export const addBook = async (req: Request, res: Response) => {
    const userId = getUserId(req);

    if (!userId) {
        return sendResponse({
            res,
            status: ResponseCodes.UNAUTHORIZED,
            message: ResponseMessages.ACCESS_DENIED,
        });
    }

    const validatedBody = validateRequestBody<AddBookBodyDto>({
        dto: req.body,
        schema: AddBookBodySchema,
        res,
    });

    if (!validatedBody) {
        return;
    }

    const { name, description } = validatedBody;

    const book = new Books({
        name,
        description,
        userId,
    });

    try {
        await book.save();

        return sendResponse({
            res,
            status: ResponseCodes.OK,
            message: ResponseMessages.BOOK_ADDED,
        });
    } catch (err) {
        handleServerError(err, res);
    }
};

export const removeBook = async (req: Request, res: Response) => {
    const validatedBody = validateRequestBody<RemoveBookBodyDto>({
        dto: req.body,
        schema: RemoveBookBodySchema,
        res,
    });

    if (!validatedBody) {
        return;
    }

    const userId = getUserId(req);
    const { bookId } = validatedBody;

    if (!userId || !bookId) {
        return sendResponse({
            res,
            status: ResponseCodes.UNAUTHORIZED,
            message: ResponseMessages.ACCESS_DENIED,
        });
    }

    try {
        await Books.deleteOne({ _id: bookId, userId });

        return sendResponse({
            res,
            status: ResponseCodes.OK,
            message: ResponseMessages.BOOK_REMOVED,
        });
    } catch (err) {
        handleServerError(err, res);
    }
};
