import eventsResolver from "./event";
import authResolver from "./auth";
import bookingsResolver from "./booking";

export default {
    ...authResolver,
    ...eventsResolver,
    ...bookingsResolver,
};
