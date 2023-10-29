import type { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}

declare module 'jsonwebtoken' {
    interface JwtPayload {
        type?: ITokenTypes;
    }
}