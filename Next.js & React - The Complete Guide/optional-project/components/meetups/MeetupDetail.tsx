import Image from "next/image";
import { FunctionComponent } from "react";

import classes from "./MeetupDetail.module.css";

import { Meetup } from "../../types";

const MeetupDetail: FunctionComponent<Meetup> = (props) => {
    return (
        <section className={classes.detail}>
            <Image
                src={props.image}
                alt={props.title}
                width="100%"
                height="65%"
                layout="responsive"
                objectFit="cover"
            />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    );
};

export default MeetupDetail;
