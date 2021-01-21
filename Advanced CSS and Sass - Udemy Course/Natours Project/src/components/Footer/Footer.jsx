import React from "react";
import logo1 from "../../assets/logo-green-1x.png";
import logo2 from "../../assets/logo-green-2x.png";
import logoSmall1 from "../../assets/logo-green-small-1x.png";
import logoSmall2 from "../../assets/logo-green-small-2x.png";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__logo-box">
                <picture className="footer__logo">
                    <source
                        srcSet={`${logoSmall1} 1x, ${logoSmall2} 2x`}
                        media="(max-width: 37.5em)"
                    />
                    <img srcSet={`${logo1} 1x, ${logo2} 2x`} alt="Full logo" src={logo2} />
                </picture>
            </div>
            <div className="row">
                <div className="col-1-of-2">
                    <div className="footer__navigation">
                        <ul className="footer__list">
                            <li className="footer__item">
                                {/* eslint-disable-next-line */}
                                <a href="#" className="footer__link">
                                    Company
                                </a>
                            </li>
                            <li className="footer__item">
                                {/* eslint-disable-next-line */}
                                <a href="#" className="footer__link">
                                    Contact us
                                </a>
                            </li>
                            <li className="footer__item">
                                {/* eslint-disable-next-line */}
                                <a href="#" className="footer__link">
                                    Careers
                                </a>
                            </li>
                            <li className="footer__item">
                                {/* eslint-disable-next-line */}
                                <a href="#" className="footer__link">
                                    Privacy policy
                                </a>
                            </li>
                            <li className="footer__item">
                                {/* eslint-disable-next-line */}
                                <a href="#" className="footer__link">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-1-of-2">
                    <p className="footer__copyright">
                        Built by &nbsp;
                        {/* eslint-disable-next-line */}
                        <a href="#" className="footer__link">
                            Mayank Singla
                        </a>
                        &nbsp; for my online course &nbsp;
                        {/* eslint-disable-next-line */}
                        <a href="#" className="footer__link">
                            Advanced CSS and SASS
                        </a>
                        . Copyright &copy; by Mayank Singla. You are 100% allowed to use this
                        webpage for both personal and commercial use, but not to claim it as your
                        own design. A credit to the original author, Mayank Singla, is of course
                        highly appreciated!
                    </p>
                </div>
            </div>
        </footer>
    );
}
