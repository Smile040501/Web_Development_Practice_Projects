import { Schema, model } from "mongoose";

import { User } from "../interfaces/User";

const userSchema = new Schema<User>({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

export default model<User>("User", userSchema);
