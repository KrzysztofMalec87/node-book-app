import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
    username: string;
    password: string;
    comparePassword: (plaintext: string) => boolean;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);

    return next();
});

UserSchema.methods.comparePassword = function (plaintext: string) {
    return bcrypt.compare(plaintext, this.password);
};

export default mongoose.connection.model<IUser>('User', UserSchema);
