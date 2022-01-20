import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { FunctionComponent } from "react";
import dbConnect from "../../lib/connectDb";
import Meetup from "../../models/Meetup";
import { Meetup as IMeetup } from "../../types/";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails: FunctionComponent<{ meetupData: IMeetup }> = (props) => {
    const {
        meetupData: { title, image, description, address },
    } = props;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <MeetupDetail
                title={title}
                image={image}
                address={address}
                description={description}
            />
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Next.js needs to generate all the dynamic versions of this dynamic page in advance during build

    try {
        await dbConnect();
        const meetups = await Meetup.find({}, { _id: 1 });
        return {
            fallback: "blocking", // if false, then only the provided param values will be allowed and 404 for not found
            // true, will immediately return an empty page and then pull down updates
            // blocking will only return the pre-generated page with all the content
            paths: meetups.map((meetup) => ({
                params: { meetupId: meetup._id.toString() },
            })), // Tell Next.js for which dynamic param values this page should be pre-generatedś
        };
    } catch (error) {
        throw error;
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { meetupId } = context.params as { meetupId: string };

    try {
        await dbConnect();
        const meetup = await Meetup.findById(meetupId);
        if (!meetup) {
            throw new Error("Meetup not found");
        }
        return {
            props: {
                meetupData: {
                    id: meetup._id.toString(),
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    description: meetup.description,
                },
            },
        };
    } catch (error) {
        throw error;
    }
};

export default MeetupDetails;
