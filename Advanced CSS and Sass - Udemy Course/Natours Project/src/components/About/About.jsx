import React from "react";
import ImageComposition from "../ImageComposition/ImageComposition.jsx";

export default function About() {
    return (
        <section className="section-about">
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">Exciting tours for adventurous people</h2>
            </div>
            <div className="row">
                <div className="col-1-of-2">
                    <h3 className="heading-tertiary u-margin-bottom-small">
                        You're going to fall in love with nature
                    </h3>
                    <p className="paragraph">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil repellat
                        libero repudiandae dignissimos quis rem autem inventore dolor consectetur
                        adipisicing elit.
                    </p>
                    <h3 className="heading-tertiary u-margin-bottom-small">
                        Live adventurous like you never have before
                    </h3>
                    <p className="paragraph">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime id vitae,
                        non nulla, dolore rerum quibusdam excepturi eveniet labore quis.
                    </p>
                    {/* eslint-disable-next-line */}
                    <a href="#" className="btn-text">
                        Learn More &rarr;
                    </a>
                </div>
                <div className="col-1-of-2">
                    <ImageComposition></ImageComposition>
                </div>
            </div>
        </section>
    );
}
