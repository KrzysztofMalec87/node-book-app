import { z } from 'zod';

export const UserPayloadBodySchema = z
    .object({
        username: z.string(),
        password: z.string(),
    })
    .strict();

export type UserPayloadBodyDto = z.infer<typeof UserPayloadBodySchema>;
