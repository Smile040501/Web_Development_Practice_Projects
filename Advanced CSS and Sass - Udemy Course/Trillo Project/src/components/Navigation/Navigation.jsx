import React from "react";
import sprite from "../../assets/sprite.svg";

export default function Navigation() {
    return (
        <nav className="sidebar">
            <ul className="side-nav">
                <li className="side-nav__item side-nav__item--active">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="side-nav__link">
                        <svg className="side-nav__icon">
                            <use href={sprite + "#icon-home"} />
                        </svg>
                        <span>Hotel</span>
                    </a>
                </li>
                <li className="side-nav__item">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="side-nav__link">
                        <svg className="side-nav__icon">
                            <use href={sprite + "#icon-aircraft-take-off"} />
                        </svg>
                        <span>Flight</span>
                    </a>
                </li>
                <li className="side-nav__item">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="side-nav__link">
                        <svg className="side-nav__icon">
                            <use href={sprite + "#icon-key"} />
                        </svg>
                        <span>Car rental</span>
                    </a>
                </li>
                <li className="side-nav__item">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="side-nav__link">
                        <svg className="side-nav__icon">
                            <use href={sprite + "#icon-map"} />
                        </svg>
                        <span>Tours</span>
                    </a>
                </li>
            </ul>
            <div className="legal">&copy; 2021 by Mayank. All rights reserved.</div>
        </nav>
    );
}
