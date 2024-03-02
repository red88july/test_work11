import { Model } from "mongoose";
import User from "./models/User";
import Post from "./models/Product";
export interface UsersDataTypes {
    username: string;
    password: string;
    name: string;
    phone: string;
}

export interface UserDataExtendsSchema extends UsersDataTypes {
    token: string;
}

export interface ProductDataTypes {
    user: User;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string | null
}

interface UserMethods {
    checkPassword(password: string): Promise<Boolean>;
    generatedToken();
}

type UserModel = Model<UserDataExtendsSchema, {}, UserMethods>