import React from "react";

export default function Booking() {
    return (
        <section className="section-booking">
            <div className="row">
                <div className="book">
                    <div className="book__form">
                        <form action="#" className="form">
                            <div className="u-margin-bottom-medium">
                                <h2 className="heading-secondary">Start booking now</h2>
                            </div>
                            <div className="form__group">
                                <input
                                    type="text"
                                    className="form__input"
                                    placeholder="Full Name"
                                    id="name"
                                    required
                                />
                                <label htmlFor="name" className="form__label">
                                    Full Name
                                </label>
                            </div>
                            <div className="form__group">
                                <input
                                    type="email"
                                    className="form__input"
                                    placeholder="Email address"
                                    id="email"
                                    required
                                />
                                <label htmlFor="email" className="form__label">
                                    Email address
                                </label>
                            </div>
                            <div className="form__group">
                                <div className="form__radio-group">
                                    <input
                                        type="radio"
                                        className="form__radio-input"
                                        id="small"
                                        name="size"
                                    />
                                    <label htmlFor="small" className="form__radio-label">
                                        <span className="form__radio-button"></span>
                                        Small tour group
                                    </label>
                                </div>
                                <div className="form__radio-group">
                                    <input
                                        type="radio"
                                        className="form__radio-input"
                                        id="large"
                                        name="size"
                                    />
                                    <label htmlFor="large" className="form__radio-label">
                                        <span className="form__radio-button"></span>
                                        Large tour group
                                    </label>
                                </div>
                            </div>
                            <div className="form__group  u-margin-top-medium">
                                <button className="btn btn--green">Next step &rarr;</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
