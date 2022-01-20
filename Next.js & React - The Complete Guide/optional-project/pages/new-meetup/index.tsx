// our-domain.com/new-meetup

import Head from "next/head";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import { Meetup } from "../../types";

const NewMeetupPage: FunctionComponent = () => {
    const router = useRouter();

    const addMeetupHandler = async (meetup: Meetup) => {
        const res = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(meetup),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta
                    name="description"
                    content="Add your own meetups and create amazing networking opportunities."
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
};

export default NewMeetupPage;
