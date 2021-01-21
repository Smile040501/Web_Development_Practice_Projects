/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import nat1 from "../../assets/nat-1.jpg";
import natLarge1 from "../../assets/nat-1-large.jpg";
import nat2 from "../../assets/nat-2.jpg";
import natLarge2 from "../../assets/nat-2-large.jpg";
import nat3 from "../../assets/nat-3.jpg";
import natLarge3 from "../../assets/nat-3-large.jpg";

export default function ImageComposition() {
    return (
        <div className="composition">
            <img
                srcSet={`${nat1} 300w, ${natLarge1} 1000w`}
                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 30rem"
                src={natLarge1}
                alt="Photo 1"
                className="composition__photo composition__photo--p1"
            />
            <img
                srcSet={`${nat2} 300w, ${natLarge2} 1000w`}
                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 30rem"
                src={natLarge1}
                alt="Photo 2"
                className="composition__photo composition__photo--p2"
            />
            <img
                srcSet={`${nat3} 300w, ${natLarge3} 1000w`}
                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 30rem"
                src={natLarge1}
                alt="Photo 3"
                className="composition__photo composition__photo--p3"
            />

            {/* <img src={nat1} alt="Photo 1" className="composition__photo composition__photo--p1" />
            <img src={nat2} alt="Photo 2" className="composition__photo composition__photo--p2" />
            <img src={nat3} alt="Photo 3" className="composition__photo composition__photo--p3" /> */}
        </div>
    );
}
