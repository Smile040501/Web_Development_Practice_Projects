import React from "react";
import img1 from "../../assets/nat-8.jpg";
import img2 from "../../assets/nat-9.jpg";
import vid1 from "../../assets/video.mp4";
import vid2 from "../../assets/video.webm";

export default function Stories() {
    return (
        <section className="section-stories">
            <div className="bg-video">
                <video key={vid1} className="bg-video__content" autoPlay muted loop>
                    <source src={vid1} type="video/mp4" />
                    <source src={vid2} type="video/webm" />
                    Your browser is not supported
                </video>
            </div>
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">We make people genuinely happy</h2>
            </div>
            <div className="row">
                <div className="story">
                    <figure className="story__shape">
                        <img src={img1} alt="Person on a tour" className="story__img" />
                        <figcaption className="story__caption">Mary Smith</figcaption>
                    </figure>
                    <div className="story__text">
                        <h3 className="heading__tertiary u-margin-bottom-small">
                            I had the best week with my family
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex magnam
                            doloribus illum velit tempora libero. Dolorum ea nemo, laudantium
                            accusamus sequi asperiores quis porro, qui laboriosam amet dicta?
                            Voluptatum, dolores?Dolorum ea nemo, laudantium accusamus sequi
                            asperiores quis porro.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="story">
                    <figure className="story__shape">
                        <img src={img2} alt="Person on a tour" className="story__img" />
                        <figcaption className="story__caption">Jack Wilson</figcaption>
                    </figure>
                    <div className="story__text">
                        <h3 className="heading__tertiary u-margin-bottom-small">
                            WOW! My life is completely different now
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex magnam
                            doloribus illum velit tempora libero. Dolorum ea nemo, laudantium
                            accusamus sequi asperiores quis porro, qui laboriosam amet dicta?
                            Voluptatum, dolores?Dolorum ea nemo, laudantium accusamus sequi
                            asperiores quis porro.
                        </p>
                    </div>
                </div>
            </div>
            <div className="u-center-text u-margin-top-huge">
                {/* eslint-disable-next-line */}
                <a href="#" className="btn-text">
                    Read all stories &rarr;
                </a>
            </div>
        </section>
    );
}
