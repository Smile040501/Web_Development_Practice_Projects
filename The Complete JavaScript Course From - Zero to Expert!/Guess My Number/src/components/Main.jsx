import React, { useState } from "react";

export default function Main(props) {
    const [guessedNum, setNum] = useState("");

    const handleChange = (e) => {
        setNum(e.target.value);
    };

    const handleClick = (e) => {
        props.evaluate(guessedNum);
        e.preventDefault();
    };

    return (
        <main>
            <section className="left">
                <form onSubmit={handleClick}>
                    <input
                        onChange={handleChange}
                        type="number"
                        className="guess"
                        value={guessedNum}
                    />
                    <button className="btn check">Check!</button>
                </form>
            </section>
            <section className="right">
                <p className="message">{props.msg}</p>
                <p className="label-score">
                    💯 Score: <span className="score">{props.score}</span>
                </p>
                <p className="label-highscore">
                    🥇 Highscore: <span className="highscore">{props.highScore}</span>
                </p>
            </section>
        </main>
    );
}
