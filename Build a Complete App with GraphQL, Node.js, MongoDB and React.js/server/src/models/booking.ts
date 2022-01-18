import { Schema, model } from "mongoose";

import { Booking } from "../interfaces/Booking";

const bookingSchema = new Schema<Booking>(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default model<Booking>("Booking", bookingSchema);
