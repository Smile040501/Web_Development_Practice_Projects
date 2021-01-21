import React from "react";
import story1 from "../assets/story-1.jpeg";
import story2 from "../assets/story-2.jpeg";

export default function StoryPictures() {
    return (
        <div className="story__pictures">
            <img src={story1} alt="Couple with new house" className="story__img--1" />
            <img src={story2} alt="New house" className="story__img--2" />
        </div>
    );
}
