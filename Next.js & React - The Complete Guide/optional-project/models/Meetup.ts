import { Schema, models, model } from "mongoose";

import { Meetup } from "../types";

const meetupSchema = new Schema<Meetup>({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export default models.Meetup || model<Meetup>("Meetup", meetupSchema);
