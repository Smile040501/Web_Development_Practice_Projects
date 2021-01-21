import React from "react";

import HomesCard from "./HomesCard.jsx";

import house1 from "../assets/house-1.jpeg";
import house2 from "../assets/house-2.jpeg";
import house3 from "../assets/house-3.jpeg";
import house4 from "../assets/house-4.jpeg";
import house5 from "../assets/house-5.jpeg";
import house6 from "../assets/house-6.jpeg";

export default function Homes() {
    return (
        <section className="homes">
            <HomesCard
                src={house1}
                houseNumber="1"
                houseName="Beautiful family house"
                houseLocation="USA"
                numRooms="5"
                houseArea="325"
                housePrice="$1,200,000"
            />

            <HomesCard
                src={house2}
                houseNumber="2"
                houseName="Modern Glass Villa"
                houseLocation="Canada"
                numRooms="6"
                houseArea="450"
                housePrice="$2,750,000"
            />

            <HomesCard
                src={house3}
                houseNumber="3"
                houseName="Cozy Country House"
                houseLocation="UK"
                numRooms="4"
                houseArea="250"
                housePrice="$850,000"
            />

            <HomesCard
                src={house4}
                houseNumber="4"
                houseName="Large Rustical Villa"
                houseLocation="Portugal"
                numRooms="6"
                houseArea="480"
                housePrice="$1,950,000"
            />

            <HomesCard
                src={house5}
                houseNumber="5"
                houseName="Majestic Palace House"
                houseLocation="Germany"
                numRooms="18"
                houseArea="4230"
                housePrice="$9,500,000"
            />

            <HomesCard
                src={house6}
                houseNumber="6"
                houseName="Modern Family Apartment"
                houseLocation="Italy"
                numRooms="3"
                houseArea="180"
                housePrice="$600,000"
            />
        </section>
    );
}
