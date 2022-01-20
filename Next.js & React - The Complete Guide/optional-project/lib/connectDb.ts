import mongoose from "mongoose";

// Create a .env.local file in project root folder and put
// MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.lnjtv.mongodb.net/nextjs-meetups?retryWrites=true&w=majority"
const MONGODB_URI: string = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = { bufferCommands: false };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
