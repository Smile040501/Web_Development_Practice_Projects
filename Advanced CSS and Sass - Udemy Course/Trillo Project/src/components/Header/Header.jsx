import React from "react";
import logo from "../../assets/logo.png";
import sprite from "../../assets/sprite.svg";
import user from "../../assets/user.jpg";

export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="trillo logo" className="logo" />

            <form action="#" className="search">
                <input type="text" className="search__input" placeholder="Search Hotels" />
                <button className="search__button">
                    <svg className="search__icon">
                        <use href={sprite + "#icon-magnifying-glass"} />
                    </svg>
                </button>
            </form>

            <nav className="user-nav">
                <div className="user-nav__icon-box">
                    <svg className="user-nav__icon">
                        <use href={sprite + "#icon-bookmark"} />
                    </svg>
                    <span className="user-nav__notification">7</span>
                </div>
                <div className="user-nav__icon-box">
                    <svg className="user-nav__icon">
                        <use href={sprite + "#icon-chat"} />
                    </svg>
                    <span className="user-nav__notification">13</span>
                </div>
                <div className="user-nav__user">
                    <img src={user} alt="User" className="user-nav__user-photo" />
                    <span className="user-nav__user-name">Jonas</span>
                </div>
            </nav>
        </header>
    );
}
