import Heading from "./components/Heading/Heading";
import SmileImage from "./components/SmileImage/SmileImage";
import _ from "lodash";

const heading = new Heading();
heading.render(_.upperFirst("smile"));

const smileImage = new SmileImage();
smileImage.render();
