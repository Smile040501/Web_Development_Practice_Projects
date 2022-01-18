import { Request } from "express";
import { Types } from "mongoose";

import { Event as EventInterface } from "../../interfaces/Event";
import { Booking, Event } from "../../models";
import { transformBooking, transformEvent } from "./merge";

const bookings = async (_: any, req: Request) => {
    if (!(req as any).isAuth) {
        throw new Error("Unauthenticated");
    }
    try {
        const bookings = await Booking.find();
        return bookings.map(transformBooking);
    } catch (error) {
        throw error;
    }
};

const bookEvent = async (args: { eventId: Types.ObjectId }, req: Request) => {
    if (!(req as any).isAuth) {
        throw new Error("Unauthenticated");
    }
    const fetchedEvent = await Event.findById(args.eventId);
    if (!fetchedEvent) {
        throw new Error("Event not found!");
    }
    const booking = new Booking({
        user: (req as any).userId,
        event: fetchedEvent.id,
    });
    const createdBooking = await booking.save();
    return transformBooking(createdBooking);
};

const cancelBooking = async (
    args: { bookingId: Types.ObjectId },
    req: Request
) => {
    if (!(req as any).isAuth) {
        throw new Error("Unauthenticated");
    }
    try {
        const { bookingId } = args;
        const booking = await Booking.findById(bookingId).populate<{
            event: EventInterface;
        }>("event");
        if (!booking) {
            throw new Error("Booking not found!");
        }
        await Booking.deleteOne({ _id: bookingId });
        return transformEvent(booking.event);
    } catch (error) {
        throw error;
    }
};

export default { bookings, bookEvent, cancelBooking };
