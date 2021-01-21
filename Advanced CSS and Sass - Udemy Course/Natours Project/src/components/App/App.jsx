import React from "react";
import Navigation from "../Navigation/Navigation.jsx";
import Header from "../Header/Header.jsx";
import About from "../About/About.jsx";
import Features from "../Features/Features.jsx";
import Tours from "../Tours/Tours.jsx";
import Stories from "../Stories/Stories.jsx";
import Booking from "../Booking/Booking.jsx";
import Footer from "../Footer/Footer.jsx";
import Popup from "../Popup/Popup.jsx";

export default function App() {
    return (
        <div>
            <Navigation></Navigation>
            <Header></Header>
            <main>
                <About></About>
                <Features></Features>
                <Tours></Tours>
                <Stories></Stories>
                <Booking></Booking>
            </main>
            <Footer></Footer>
            <Popup></Popup>
        </div>
    );
}
