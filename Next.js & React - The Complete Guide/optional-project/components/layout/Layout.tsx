import { FunctionComponent, ReactNode } from "react";

import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

const Layout: FunctionComponent = (props) => {
    return (
        <div>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
        </div>
    );
};

export default Layout;
