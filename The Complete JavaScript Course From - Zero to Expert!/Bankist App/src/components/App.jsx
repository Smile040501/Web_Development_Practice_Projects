import React, { useState } from "react";
import classnames from "classnames";

import Navigation from "./Navigation.jsx";
import Balance from "./Balance.jsx";
import Movements from "./Movements.jsx";
import Summary from "./Summary.jsx";
import Transfer from "./Transfer.jsx";
import Loan from "./Loan.jsx";
import Close from "./Close.jsx";
import Timer from "./Timer.jsx";

// Dummy Data
const accounts = [
    {
        owner: "Mayank Singla",
        interestRate: 1.2, // %
        pin: 1111,
        movements: [
            {
                amount: 200,
                date: "2019-11-18T21:31:17.178Z",
            },
            {
                amount: 450,
                date: "2019-12-23T07:42:02.383Z",
            },
            {
                amount: -400,
                date: "2020-01-28T09:15:04.904Z",
            },
            {
                amount: 3000,
                date: "2020-04-01T10:17:24.185Z",
            },
            {
                amount: -650,
                date: "2020-05-08T14:11:59.604Z",
            },
            {
                amount: -130,
                date: "2021-01-21T17:01:17.194Z",
            },
            {
                amount: 70,
                date: "2021-01-25T23:36:17.929Z",
            },
            {
                amount: 1300,
                date: "2021-01-27T10:51:36.790Z",
            },
        ],
        currency: "INR",
        locale: "hi-IN",
    },

    {
        owner: "Jessica Davis",
        interestRate: 1.5,
        pin: 2222,
        movements: [
            {
                amount: 5000,
                date: "2019-11-01T13:15:33.035Z",
            },
            {
                amount: 3400,
                date: "2019-11-30T09:48:16.867Z",
            },
            {
                amount: -150,
                date: "2019-12-25T06:04:23.907Z",
            },
            {
                amount: -790,
                date: "2020-01-25T14:18:46.235Z",
            },
            {
                amount: -3210,
                date: "2020-02-05T16:33:06.386Z",
            },
            {
                amount: -1000,
                date: "2020-04-10T14:43:26.374Z",
            },
            {
                amount: 8500,
                date: "2020-06-25T18:49:59.371Z",
            },
            {
                amount: -30,
                date: "2020-07-26T12:01:20.894Z",
            },
        ],
        currency: "USD",
        locale: "en-US",
    },

    {
        owner: "Steven Thomas Williams",
        interestRate: 0.7,
        pin: 3333,
        movements: [
            {
                amount: 200,
                date: "2019-11-01T13:15:33.035Z",
            },
            {
                amount: -200,
                date: "2019-11-30T09:48:16.867Z",
            },
            {
                amount: 340,
                date: "2019-12-25T06:04:23.907Z",
            },
            {
                amount: -300,
                date: "2020-01-25T14:18:46.235Z",
            },
            {
                amount: -20,
                date: "2020-02-05T16:33:06.386Z",
            },
            {
                amount: 50,
                date: "2020-04-10T14:43:26.374Z",
            },
            {
                amount: 400,
                date: "2020-06-25T18:49:59.371Z",
            },
            {
                amount: -460,
                date: "2020-07-26T12:01:20.894Z",
            },
        ],
        currency: "SGD",
        locale: "zh-SG",
    },

    {
        owner: "Sarah Smith",
        interestRate: 1,
        pin: 4444,
        movements: [
            {
                amount: 430,
                date: "2019-11-18T21:31:17.178Z",
            },
            {
                amount: 1000,
                date: "2019-12-23T07:42:02.383Z",
            },
            {
                amount: 700,
                date: "2020-01-28T09:15:04.904Z",
            },
            {
                amount: 50,
                date: "2020-04-01T10:17:24.185Z",
            },
            {
                amount: 90,
                date: "2020-05-08T14:11:59.604Z",
            },
        ],
        currency: "EUR",
        locale: "pt-PT",
    },
];

// Creating User Names
accounts.forEach((acc) => {
    acc.userName = acc.owner
        .split(" ")
        .map((word) => word[0].toLowerCase())
        .join("");
});

// Updating each account
const updateAccount = (acc) => {
    acc.balance = acc?.movements?.reduce((acc, mov) => acc + mov.amount, 0);

    acc.summary = {};
    acc.summary.deposit = acc?.movements
        ?.filter((mov) => mov.amount > 0)
        ?.reduce((acc, mov) => acc + mov.amount, 0);

    acc.summary.withdrawal = acc?.movements
        ?.filter((mov) => mov.amount < 0)
        ?.reduce((acc, mov) => acc + mov.amount, 0);

    acc.summary.interest = acc?.movements
        ?.filter((mov) => mov.amount > 0)
        ?.map((mov) => (mov.amount * acc.interestRate) / 100)
        ?.filter((movAmt) => movAmt >= 1)
        ?.reduce((acc, movAmt) => acc + movAmt, 0);
};

let timer;

export default function App() {
    const [login, setLogin] = useState({ display: false, error: false });
    const [currAcc, setCurrAcc] = useState({});
    const [sorted, setSorted] = useState(false);
    const [changed, setChanged] = useState(1);
    const [displayTime, setDisplayTime] = useState({ min: "00", sec: "00" });
    const now = new Date();

    // Logout User
    const logout = () => {
        setLogin({ display: false, error: false });
        setSorted(false);
        setChanged(1);
    };

    // Start Logout Timer
    const startLogoutTimer = () => {
        let time = 600;
        const tick = () => {
            const min = String(Math.trunc(time / 60)).padStart(2, 0);
            const sec = String(time % 60).padStart(2, 0);
            setDisplayTime({ min, sec });
            if (time === 0) {
                clearInterval(timer);
                logout();
            }
            --time;
        };
        tick();
        const timer = setInterval(tick, 1000);
        return timer;
    };

    // Validate Login
    const validate = (userName, pin) => {
        const account = accounts.find((acc) => acc.userName === userName && acc.pin === +pin);
        if (account) {
            setLogin({ display: true, error: false });
            updateAccount(account);
            setCurrAcc(account);
            clearInterval(timer);
            timer = startLogoutTimer();
        } else if (userName || pin) {
            setLogin({ display: false, error: true });
            setCurrAcc({});
        }
        setSorted(false);
    };

    // Validate and Make Transfer of Amount
    const transfer = (userName, amt) => {
        const receiverAcc = accounts.find((acc) => acc.userName === userName);
        const amount = +amt;
        if (
            receiverAcc &&
            userName !== currAcc.userName &&
            amount > 0 &&
            amount <= currAcc.balance
        ) {
            receiverAcc.movements.push({ amount, date: now.toISOString() });
            currAcc.movements.push({ amount: -amount, date: now.toISOString() });
            updateAccount(currAcc);
            setChanged(changed + 1);
            setSorted(false);
            clearInterval(timer);
            timer = startLogoutTimer();
        }
    };

    // Validate and Grant Loan
    const takeLoan = (loan) => {
        const amount = +loan;
        if (amount && amount > 0 && currAcc.movements.some((mov) => mov.amount >= loan * 0.1)) {
            setTimeout(() => {
                currAcc.movements.push({ amount: Math.floor(amount), date: now.toISOString() });
                updateAccount(currAcc);
                setChanged(changed + 1);
                setSorted(false);
            }, 2500);
            clearInterval(timer);
            timer = startLogoutTimer();
        }
    };

    // Close Account
    const closeAcc = (userName, pin) => {
        if (userName === currAcc.userName && +pin === currAcc.pin) {
            const accIndex = accounts.findIndex((acc) => acc.userName === userName);
            accounts.splice(accIndex, 1);
            setLogin({ display: false, error: false });
            setCurrAcc({});
            setSorted(false);
            clearInterval(timer);
        }
    };

    // Sort Movements
    const sortMovements = () => {
        setSorted((prevVal) => !prevVal);
        clearInterval(timer);
        timer = startLogoutTimer();
    };

    return (
        <div>
            <Navigation
                validate={validate}
                login={login}
                ownerName={currAcc?.owner?.split(" ")[0]}
            />
            <main className={classnames("app", login.display ? "app-display" : "")}>
                <Balance acc={currAcc} />
                <Movements acc={currAcc} sorted={sorted} changed={changed} />
                <Summary acc={currAcc} sortMovements={sortMovements} />
                <Transfer transfer={transfer} />
                <Loan takeLoan={takeLoan} />
                <Close closeAcc={closeAcc} />
                <Timer displayTime={displayTime} />
            </main>
        </div>
    );
}
