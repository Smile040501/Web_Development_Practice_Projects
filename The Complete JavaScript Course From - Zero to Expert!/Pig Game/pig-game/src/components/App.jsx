import React, { useState } from "react";

import classnames from "classnames";

import dice1 from "../assets/dice-1.png";
import dice2 from "../assets/dice-2.png";
import dice3 from "../assets/dice-3.png";
import dice4 from "../assets/dice-4.png";
import dice5 from "../assets/dice-5.png";
import dice6 from "../assets/dice-6.png";

const maxScore = 100;

export default function App() {
    const imagesArr = [dice1, dice2, dice3, dice4, dice5, dice6];

    const [num, setNum] = useState(0);
    const [player, setPlayer] = useState(0);
    const [playerZeroScore, setPlayerZeroScore] = useState(0);
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [winner, setWinner] = useState(-1);
    const [gameOver, setGameOver] = useState(false);

    const reset = () => {
        setNum(0);
        setPlayer(0);
        setPlayerZeroScore(0);
        setPlayerOneScore(0);
        setCurrentScore(0);
        setWinner(-1);
        setGameOver(false);
    };

    const rollDice = () => {
        const newNum = Math.trunc(Math.random() * 6) + 1;
        setNum(newNum);
        if (newNum === 1) {
            setPlayer((prevPlayer) => prevPlayer ^ 1);
            setCurrentScore(0);
        } else {
            setCurrentScore(currentScore + newNum);
        }
    };

    const hold = () => {
        let newTotalScore = currentScore;
        if (player === 0) {
            newTotalScore += playerZeroScore;
            setPlayerZeroScore(newTotalScore);
        } else {
            newTotalScore += playerOneScore;
            setPlayerOneScore(newTotalScore);
        }
        if (newTotalScore >= maxScore) {
            setWinner(player);
            setGameOver(true);
        }
        setPlayer((prevPlayer) => prevPlayer ^ 1);
        setCurrentScore(0);
    };

    return (
        <main>
            <section
                className={classnames(
                    "player",
                    "player--0",
                    player === 0 ? "player--active" : "",
                    winner === 0 ? "player--winner" : ""
                )}
            >
                <h2 className="name" id="name--0">
                    {`Player 1 ${gameOver ? (playerZeroScore >= maxScore ? "Won" : "Lost") : ""}`}
                </h2>
                <p className="score" id="score--0">
                    {playerZeroScore}
                </p>
                <div className="current">
                    <p className="current-label">Current</p>
                    <p className="current-score" id="current--0">
                        {player === 0 ? currentScore : 0}
                    </p>
                </div>
            </section>

            <section
                className={classnames(
                    "player",
                    "player--1",
                    player === 1 ? "player--active" : "",
                    winner === 1 ? "player--winner" : ""
                )}
            >
                <h2 className="name" id="name--1">
                    {`Player 2 ${gameOver ? (playerOneScore >= maxScore ? "Won" : "Lost") : ""}`}
                </h2>
                <p className="score" id="score--1">
                    {playerOneScore}
                </p>
                <div className="current">
                    <p className="current-label">Current</p>
                    <p className="current-score" id="current--1">
                        {player === 1 ? currentScore : 0}
                    </p>
                </div>
            </section>

            {num !== 0 && !gameOver && (
                <img src={imagesArr[num - 1]} alt="Playing dice" className="dice" />
            )}

            <button className="btn btn--new" onClick={reset}>
                🔄 New game
            </button>

            {!gameOver && (
                <button className="btn btn--roll" onClick={rollDice}>
                    🎲 Roll dice
                </button>
            )}

            {!gameOver && (
                <button className="btn btn--hold" onClick={hold}>
                    📥 Hold
                </button>
            )}
        </main>
    );
}
