import React from "react";
import MovementsRow from "./MovementsRow";

export default function Movements(props) {
    const movements = props.sorted
        ? props.acc?.movements?.slice()?.sort((a, b) => a?.amount - b?.amount)
        : props.acc?.movements;

    return (
        <div className="movements">
            {props.changed > 0 &&
                movements
                    ?.map((mov, i) => {
                        return (
                            <MovementsRow
                                mov={mov}
                                locale={props.acc?.locale}
                                currency={props.acc?.currency}
                                index={i}
                                key={i}
                            />
                        );
                    })
                    ?.reverse()}
        </div>
    );
}
