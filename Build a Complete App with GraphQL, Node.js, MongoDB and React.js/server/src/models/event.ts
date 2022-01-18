import { Schema, model } from "mongoose";

import { Event } from "../interfaces/Event";

const eventSchema = new Schema<Event>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export default model<Event>("Event", eventSchema);
