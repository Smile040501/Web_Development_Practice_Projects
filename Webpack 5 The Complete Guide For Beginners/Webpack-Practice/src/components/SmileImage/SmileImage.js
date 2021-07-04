import Smile from "../../Smile.png";
import "./SmileImage.scss";

class SmileImage {
    render() {
        const img = document.createElement("img");
        img.src = Smile;
        img.alt = "Smile";
        img.classList.add("smile-image");

        const body = document.querySelector("body");
        body.appendChild(img);
    }
}

export default SmileImage;
