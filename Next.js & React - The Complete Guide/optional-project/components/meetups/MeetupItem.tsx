import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

import { Meetup } from "../../types/";

const MeetupItem: FunctionComponent<Meetup> = (props) => {
    const router = useRouter();

    const showDetailsHandler = () => {
        router.push("/" + props.id);
    };

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <Image
                        src={props.image}
                        alt={props.title}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <address>{props.address}</address>
                </div>
                <div className={classes.actions}>
                    <button onClick={showDetailsHandler}>Show Details</button>
                </div>
            </Card>
        </li>
    );
};

export default MeetupItem;
