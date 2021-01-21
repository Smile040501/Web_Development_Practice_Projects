import React from "react";

export default function Footer() {
    return (
        <footer className="footer">
            <ul className="nav">
                <li className="nav__item">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="nav__link">
                        Find your dream home
                    </a>
                </li>
                <li className="nav__item">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="nav__link">
                        Request proposal
                    </a>
                </li>
                <li className="nav__item">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="nav__link">
                        Download home planner
                    </a>
                </li>
                <li className="nav__item">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="nav__link">
                        Contact us
                    </a>
                </li>
                <li className="nav__item">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="nav__link">
                        Submit your property
                    </a>
                </li>
                <li className="nav__item">
                    {/* eslint-disable-next-line */}
                    <a href="#" className="nav__link">
                        Come work with us!
                    </a>
                </li>
            </ul>
            <p className="copyright">
                &copy; Copyright 2021 by Mayank Singla. Feel free to use this project for your own
                purposes. This does NOT apply if you plan to produce your own course or tutorials
                based on this project.
            </p>
        </footer>
    );
}
