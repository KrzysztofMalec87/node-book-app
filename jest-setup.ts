import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '@/models/user';
import Books from '@/models/books';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    const user = new User({ username: 'test', password: 'test' });

    await user.save();

    const booksData = [
        { name: 'Book1', description: 'Description for Book1', userId: user._id.toString() },
        { name: 'Book2', description: 'Description for Book2', userId: user._id.toString() },
    ];

    await Books.insertMany(booksData);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
