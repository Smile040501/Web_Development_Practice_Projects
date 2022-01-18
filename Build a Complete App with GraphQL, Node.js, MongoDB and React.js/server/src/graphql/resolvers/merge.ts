import { Types } from "mongoose";

import { Event, User } from "../../models";
import { dateToString } from "../../utils/date";
import { Event as EventInterface } from "../../interfaces/Event";
import { Booking as BookingInterface } from "../../interfaces/Booking";
import { User as UserInterface } from "../../interfaces/User";

const getEvents = async (eventIds: Types.ObjectId[]) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(transformEvent);
    } catch (error) {
        throw error;
    }
};

const getEvent = async (eventId: Types.ObjectId) => {
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error("Event doesn't exists");
        }
        return transformEvent(event);
    } catch (error) {
        throw error;
    }
};

const getUser = async (userId: Types.ObjectId): Promise<any> => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("No user found with this id!");
        }
        return transformUser(user);
    } catch (error) {
        throw error;
    }
};

export const transformEvent = (event: EventInterface) => {
    return {
        ...event._doc,
        date: dateToString(event.date),
        creator: getUser.bind(this, event.creator),
    };
};

export const transformBooking = (booking: BookingInterface) => {
    return {
        ...booking._doc,
        user: getUser.bind(this, booking.user),
        event: getEvent.bind(this, booking.event),
        createdAt: dateToString(booking.createdAt),
        updatedAt: dateToString(booking.updatedAt),
    };
};

export const transformUser = (user: UserInterface) => {
    return {
        ...user._doc,
        password: null,
        createEvents: getEvents.bind(this, user.createdEvents),
    };
};
