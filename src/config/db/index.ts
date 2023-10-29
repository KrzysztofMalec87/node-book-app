import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const dbURL = process.env.DATABASE_URL;

        if (!dbURL) {
            throw new Error('⛔[database]: DATABASE_URL not defined in environment variables');
        }

        await mongoose.connect(dbURL);

        console.log('✅[database]: Connected');
    } catch (error) {
        console.error('⛔[database]:Failed to connect', error);

        process.exit(1);
    }
};

export default connectDB;
