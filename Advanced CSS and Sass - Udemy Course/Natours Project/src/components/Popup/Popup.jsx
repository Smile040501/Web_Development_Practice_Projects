import React from "react";
import img1 from "../../assets/nat-8.jpg";
import img2 from "../../assets/nat-9.jpg";

export default function Popup() {
    return (
        <div className="popup" id="popup">
            <div className="popup__content">
                <div className="popup__left">
                    <img src={img1} alt="Tour pic" className="popup__img" />
                    <img src={img2} alt="Tour pic" className="popup__img" />
                </div>
                <div className="popup__right">
                    {/* eslint-disable-next-line */}
                    <a href="#section-tours" className="popup__close">
                        &times;
                    </a>
                    <h2 className="heading-secondary u-margin-bottom-small">Start booking now</h2>
                    <h3 className="heading-tertiary u-margin-bottom-small">
                        Important &ndash; Please read these terms before booking
                    </h3>
                    <p className="popup__text">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus beatae
                        itaque eos voluptatem deserunt iusto nemo cumque? Dolores unde ut est atque
                        similique odit inventore assumenda? Ab illo dolorum autem. Lorem ipsum dolor
                        sit amet consectetur, adipisicing elit. Minus beatae itaque eos voluptatem
                        deserunt iusto nemo cumque? Dolores unde ut est atque similique odit
                        inventore assumenda? Ab illo dolorum autem.Lorem ipsum dolor sit amet
                        consectetur, adipisicing elit. Minus beatae itaque eos voluptatem deserunt
                        iusto nemo cumque? Dolores unde ut est atque similique odit inventore
                        assumenda? Ab illo dolorum autem.Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit.
                    </p>
                    {/* eslint-disable-next-line */}
                    <a href="#" className="btn btn--green">
                        Book now
                    </a>
                </div>
            </div>
        </div>
    );
}
