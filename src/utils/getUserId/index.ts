import type { Request } from 'express';

export const getUserId = (req: Request): string | null => req.user?.id;
