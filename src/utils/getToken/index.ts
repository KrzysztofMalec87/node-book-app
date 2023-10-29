import type { JwtPayload } from 'jsonwebtoken';

export const getToken = (req: JwtPayload): string | undefined => req.header('auth-token');
