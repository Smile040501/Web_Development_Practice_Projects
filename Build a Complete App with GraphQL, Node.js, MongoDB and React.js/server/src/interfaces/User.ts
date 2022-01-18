import { Types } from "mongoose";

import DocumentType from "./DocumentType";

export interface User extends DocumentType<User> {
    email: string;
    password: string;
    createdEvents: Types.ObjectId[];
}

export interface UserInput {
    email: string;
    password: string;
}
