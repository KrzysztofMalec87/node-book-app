import 'module-alias/register';
import express from 'express';
import booksRouter from '@/routes/books';
import connectDB from '@/config/db';
import middleware from '@/middleware';
import regenerateToken from '@/routes/regenerateToken';
import swaggerRouter from '@/routes/swagger';
import userRouter from '@/routes/user';
import { ApiVersion } from '@/constants/endpoints';

const app = express();

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

middleware(app);

app.use(ApiVersion.V1, booksRouter);
app.use(ApiVersion.V1, userRouter);
app.use(ApiVersion.V1, regenerateToken);
app.use(ApiVersion.V1, swaggerRouter);

export default app;
