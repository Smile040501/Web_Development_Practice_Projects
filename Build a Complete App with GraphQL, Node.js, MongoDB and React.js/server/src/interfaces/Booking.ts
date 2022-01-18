import { Types } from "mongoose";

import DocumentType from "./DocumentType";

export interface Booking extends DocumentType<Booking> {
    event: Types.ObjectId;
    user: Types.ObjectId;
    createdAt: string;
    updatedAt: string;
}
