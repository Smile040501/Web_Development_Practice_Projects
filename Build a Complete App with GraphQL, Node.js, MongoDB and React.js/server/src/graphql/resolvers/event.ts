import { startSession } from "mongoose";
import { Request } from "express";

import { Event, User } from "../../models/";
import { EventInput } from "../../interfaces/Event";
import { transformEvent } from "./merge";

const events = async () => {
    try {
        const events = await Event.find();
        return events.map(transformEvent);
    } catch (error) {
        throw error;
    }
};

const createEvent = async (args: { eventInput: EventInput }, req: Request) => {
    if (!(req as any).isAuth) {
        throw new Error("Unauthenticated");
    }
    try {
        const { title, description, price, date } = args.eventInput;
        const newEvent = new Event({
            title,
            description,
            price,
            date: new Date(date),
            creator: (req as any).userId,
        });
        const user = await User.findById((req as any).userId);
        if (!user) {
            throw new Error("User doesn't exist");
        }

        const session = await startSession();
        session.startTransaction();
        const createdEvent = await newEvent.save({ session });
        user.createdEvents.push(createdEvent.id);
        await user.save({ session });
        await session.commitTransaction();

        return transformEvent(createdEvent);
    } catch (error) {
        throw error;
    }
};

export default { events, createEvent };
