import mongoose, { Schema } from 'mongoose';

type IBooks = Record<'name' | 'description' | 'userId', string>;

const BooksSchema = new Schema<IBooks>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

export default mongoose.connection.model<IBooks>('Books', BooksSchema);
