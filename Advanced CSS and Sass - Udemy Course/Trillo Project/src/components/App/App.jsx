import React from "react";
import Header from "../Header/Header.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import HotelView from "../HotelView/HotelView.jsx";

export default function App() {
    return (
        <div className="container">
            <Header></Header>
            <div className="content">
                <Navigation></Navigation>
                <HotelView></HotelView>
            </div>
        </div>
    );
}
