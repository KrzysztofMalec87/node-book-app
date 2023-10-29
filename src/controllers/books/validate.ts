import { z } from 'zod';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ObjectId } from 'mongodb';

const objectIdSchema = z.custom<string>((input) => ObjectId.isValid(input as string), {
    message: 'Invalid ObjectId',
});

export const GetBooksShema = z.array(
    z.object({
        _id: objectIdSchema,
        name: z.string(),
        description: z.string(),
    }),
);

export const AddBookBodySchema = z
    .object({
        name: z.string(),
        description: z.string(),
    })
    .strict();

export const RemoveBookBodySchema = z
    .object({
        bookId: z.string(),
    })
    .strict();

export type GetBooksDto = z.infer<typeof GetBooksShema>;
export type AddBookBodyDto = z.infer<typeof AddBookBodySchema>;
export type RemoveBookBodyDto = z.infer<typeof RemoveBookBodySchema>;
