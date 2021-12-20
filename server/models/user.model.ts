import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput {
    username: string;
    name: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    checkPassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.index({ username: 1 });

userSchema.pre(
    "save",
    async function (this: UserDocument, next: mongoose.HookNextFunction) {
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hashSync(this.password, salt);
        this.password = hash;
        return next();
    }
);

userSchema.methods.checkPassword = async function (
    password: string
): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(password, user.password).catch((e) => false);
};

export default mongoose.model<UserDocument>("User", userSchema);