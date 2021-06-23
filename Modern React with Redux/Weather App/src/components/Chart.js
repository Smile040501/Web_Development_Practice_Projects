import React from "react";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";

const calcAvg = (arr) => {
    return Math.round(arr.reduce((sum, el) => sum + el, 0) / arr.length);
};

export default function Chart(props) {
    return (
        <div>
            <Sparklines data={props.data} width={180} height={120}>
                <SparklinesLine color={props.color} />
                <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>
                {calcAvg(props.data)} {props.unit}
            </div>
        </div>
    );
}
