import { Types } from "mongoose";

import DocumentType from "./DocumentType";

export interface Event extends DocumentType<Event> {
    title: string;
    description: string;
    price: number;
    date: Date;
    creator: Types.ObjectId;
}

export interface EventInput {
    title: string;
    description: string;
    price: number;
    date: string;
}
