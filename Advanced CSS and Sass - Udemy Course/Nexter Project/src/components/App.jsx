import React from "react";

import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Realtors from "./Realtors.jsx";
import Features from "./Features.jsx";
import StoryPictures from "./StoryPictures.jsx";
import StoryContent from "./StoryContent.jsx";
import Homes from "./Homes.jsx";
import Gallery from "./Gallery.jsx";
import Footer from "./Footer.jsx";

export default function App() {
    return (
        <div className="container">
            <Sidebar />
            <Header />
            <Realtors />
            <Features />
            <StoryPictures />
            <StoryContent />
            <Homes />
            <Gallery />
            <Footer />
        </div>
    );
}
