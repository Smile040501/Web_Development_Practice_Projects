import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

import HeaderMenu from "./HeaderMenu";

const useStyles = makeStyles((theme) => ({
    tabContainer: {
        marginLeft: "auto",
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px",
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));

const HeaderTabs = ({
    activeRouteIdx,
    routeChangedHandler,
    routes,
    anchorEl,
    showMenu,
    menuCloseHandler,
    menuOptions,
    menuItemClickedHandler,
    selectedMenuIdx,
}) => {
    const classes = useStyles();

    return (
        <>
            <Tabs
                value={activeRouteIdx}
                onChange={routeChangedHandler}
                className={classes.tabContainer}
                indicatorColor="primary"
            >
                {routes.map((route, idx) => (
                    <Tab
                        key={idx}
                        aria-controls={route.ariaControls}
                        aria-haspopup={route.ariaPopup}
                        className={classes.tab}
                        onMouseOver={route.mouseOver}
                        component={Link}
                        to={route.path}
                        label={route.name}
                    />
                ))}
            </Tabs>
            <Button
                component={Link}
                to="/estimate"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={(e) => routeChangedHandler(e, 5)}
            >
                Free Estimate
            </Button>
            <HeaderMenu
                anchorEl={anchorEl}
                showMenu={showMenu}
                menuCloseHandler={menuCloseHandler}
                menuOptions={menuOptions}
                menuItemClickedHandler={menuItemClickedHandler}
                selectedMenuIdx={selectedMenuIdx}
                activeRouteIdx={activeRouteIdx}
            />
        </>
    );
};

export default HeaderTabs;
