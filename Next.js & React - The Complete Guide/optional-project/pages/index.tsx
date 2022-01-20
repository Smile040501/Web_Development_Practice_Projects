// our-domain.com/

import Head from "next/head";
import { GetStaticProps } from "next";
import { FunctionComponent } from "react";
import dbConnect from "../lib/connectDb";
import Meetups from "../models/Meetup";

import MeetupList from "../components/meetups/MeetupList";

import { Meetup } from "../types";

const HomePage: FunctionComponent<{ meetups: Meetup[] }> = (props) => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React Meetups"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
};

/**
 * Next.js pre-renders the pages at the time of `build` the app for production.
 * The data we are fetching from the DB will not be rendered and it will display only
 * empty HTML tags. We have a special function called `getStaticProps` that will first fetch
 * the data from the server and needs to return an object. Still, the data will only be of
 * the time of `build` of the app. If our data changes frequently, we can add a `revalidate`
 * key. It unlocks a feature called `incremental static generation`. It is the number of
 * seconds Next.js will wait until it regenerates this page for incoming request on the server
 *
 * This function always on the client side
 *
 * While building, we can see which pages of our app are `static` and which are `static site generation (SSG)` pages
 */
export const getStaticProps: GetStaticProps = async () => {
    try {
        await dbConnect();

        const meetups = await Meetups.find();

        return {
            props: {
                meetups: meetups.map((meetup) => ({
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    description: meetup.address,
                    id: meetup._id.toString(),
                })),
            },
            revalidate: 10, // in seconds
        };
    } catch (error) {
        throw error;
    }
};

/**
 * This function always runs on the server for every incoming request
 */
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// };

export default HomePage;
