import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAuth extends Document {
    email: string;
    password: string;
}

const AuthSchema: Schema = new Schema({
    email: String,
    password: String,
});

const Auth: Model<IAuth> = mongoose.model<IAuth>("Auth", AuthSchema);

export default Auth;