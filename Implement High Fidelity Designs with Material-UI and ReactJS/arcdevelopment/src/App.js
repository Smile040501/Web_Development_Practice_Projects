import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import theme from "./components/UI/Theme";
import Header from "./components/UI/Header/Header";
import Footer from "./components/UI/Footer";
import LandingPage from "./components/LandingPage";
import Services from "./components/Services";
import CustomSoftware from "./components/CustomSoftware";
import MobileApps from "./components/MobileApps";
import Websites from "./components/Websites";
import Revolution from "./components/Revolution";
import About from "./components/About";
import Contact from "./components/Contact";
import Estimate from "./components/Estimate";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/services" exact component={Services} />
                    <Route path="/customsoftware" exact component={CustomSoftware} />
                    <Route path="/mobileapps" exact component={MobileApps} />
                    <Route path="/websites" exact component={Websites} />
                    <Route path="/revolution" exact component={Revolution} />
                    <Route path="/about" exact component={About} />
                    <Route path="/contact" exact component={Contact} />
                    <Route path="/estimate" exact component={Estimate} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
