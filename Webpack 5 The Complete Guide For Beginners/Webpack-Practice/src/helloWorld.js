import HelloWorldButton from "./components/HelloWorldButton/HelloWorldButton";
import Heading from "./components/Heading/Heading";
import _ from "lodash";

const heading = new Heading();
heading.render(_.upperFirst("hello world"));

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();
