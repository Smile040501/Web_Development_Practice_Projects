import React from "react";

import sprite from "../assets/sprite.svg";

export default function HomesCard(props) {
    return (
        <div className="home">
            <img src={props.src} alt={`House ${props.houseNumber}`} className="home__img" />
            <svg className="home__like">
                <use href={sprite + "#icon-heart-full"} />
            </svg>
            <h5 className="home__name">{props.houseName}</h5>
            <div className="home__location">
                <svg>
                    <use href={sprite + "#icon-map-pin"} />
                </svg>
                <p>{props.houseLocation}</p>
            </div>
            <div className="home__rooms">
                <svg>
                    <use href={sprite + "#icon-profile-male"} />
                </svg>
                <p>{`${props.numRooms} rooms`}</p>
            </div>
            <div className="home__area">
                <svg>
                    <use href={sprite + "#icon-expand"} />
                </svg>
                <p>
                    {props.houseArea} m<sup>2</sup>
                </p>
            </div>
            <div className="home__price">
                <svg>
                    <use href={sprite + "#icon-key"} />
                </svg>
                <p>{props.housePrice}</p>
            </div>
            <button className="btn home__btn">Contact realtor</button>
        </div>
    );
}
