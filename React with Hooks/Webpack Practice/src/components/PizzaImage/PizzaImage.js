import React from "react";

import classes from "./PizzaImage.css";
import PizzImage from "../../assets/pizza.jpg";

export default function PizzaImage() {
    return (
        <div className={classes.PizzaImage}>
            <img src={PizzImage} className={classes.PizzaImg} />
        </div>
    );
}
