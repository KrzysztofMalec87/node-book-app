import { z } from 'zod';

export const RegenerateTokenBodySchema = z
    .object({
        refreshToken: z.string(),
    })
    .strict();

export type RegenerateTokenBodyDto = z.infer<typeof RegenerateTokenBodySchema>;
