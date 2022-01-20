// /api/new-meetup
// POST /api/new-meetup
import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../lib/connectDb";
import Meetup from "../../models/Meetup";

const createNewMeetup = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { title, image, address, description } = req.body;
        const newMeetup = new Meetup({ title, image, address, description });
        const createdMeetup = await newMeetup.save();
        res.status(201).json({ success: true, meetup: createdMeetup._doc });
    } catch (error) {
        throw error;
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    try {
        await dbConnect();

        switch (method) {
            case "POST":
                await createNewMeetup(req, res);
                break;
            default:
                res.status(400).json({ success: false });
                break;
        }
    } catch (error) {
        throw error;
    }
};

export default handler;
