import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

const middleware = (app: Express) => {
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(hpp());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
        }),
    );
};

export default middleware;
