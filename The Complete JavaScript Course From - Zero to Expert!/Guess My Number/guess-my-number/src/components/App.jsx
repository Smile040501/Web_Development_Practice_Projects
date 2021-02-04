import React, { useState } from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";

import classnames from "classnames";

const maxNum = 100;
let randNum = Math.trunc(Math.random() * maxNum) + 1;

export default function App() {
    const [score, setScore] = useState(maxNum);
    const [highScore, setHighScore] = useState(0);
    const [msg, setMsg] = useState("Start Guessing...");
    const [display, setDisplay] = useState(false);
    const [won, setWon] = useState(false);
    const [lost, setLost] = useState(false);

    const reset = (e) => {
        randNum = Math.trunc(Math.random() * maxNum) + 1;
        setScore(maxNum);
        setMsg("Start Guessing...");
        setDisplay(false);
        setWon(false);
        setLost(false);
        e.preventDefault();
    };

    const changeHighScore = () => {
        if (highScore < score) {
            setHighScore(score);
        }
    };

    const changeScore = (num) => {
        const guessedNum = Number(num);
        if (!guessedNum) {
            setMsg("⛔ No number!");
        } else if (guessedNum === randNum) {
            setMsg("🎉 Correct Number!");
            setDisplay(true);
            changeHighScore();
            setWon(true);
        } else {
            if (score > 0) {
                setScore(score - 1);
            }
            if (score === 1 || score === 0) {
                setMsg("💥 You Lost!");
                setDisplay(true);
                setLost(true);
            } else if (guessedNum < randNum) {
                setMsg("📉 Too low!");
            } else {
                setMsg("📈 Too high!");
            }
        }
    };

    return (
        <div className={classnames(won ? "won" : "", lost ? "lost" : "")}>
            <Header
                randNum={randNum}
                display={display}
                reset={reset}
                maxNum={maxNum}
                expand={won || lost}
            />
            <Main score={score} highScore={highScore} evaluate={changeScore} msg={msg} />
        </div>
    );
}
