import React, { useState, useEffect, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import HeaderTabs from "./HeaderTabs";
import HeaderDrawer from "./HeaderDrawer";
import logo from "../../../assets/logo.svg";

const ElevationScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
};

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em",
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em",
        },
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em",
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em",
        },
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1,
    },
}));

const menuOptions = [
    { name: "Services", path: "/services", activeIndex: 1, selectedIndex: 0 },
    {
        name: "Custom Software Development",
        path: "/customsoftware",
        activeIndex: 1,
        selectedIndex: 1,
    },
    {
        name: "iOS/Android App Development",
        path: "/mobileapps",
        activeIndex: 1,
        selectedIndex: 2,
    },
    {
        name: "Website Development",
        path: "/websites",
        activeIndex: 1,
        selectedIndex: 3,
    },
];

const Header = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [activeRouteIdx, setActiveRouteIdx] = useState(0);

    const [anchorEl, setAnchorEl] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedMenuIdx, setSelectedMenuIdx] = useState(-1);

    const routeChangedHandler = (e, val) => {
        setActiveRouteIdx(val);
    };

    const menuOpenHandler = (e) => {
        setAnchorEl(e.currentTarget);
        setShowMenu(true);
    };

    const menuCloseHandler = (e) => {
        setAnchorEl(null);
        setShowMenu(false);
    };

    const menuItemClickedHandler = (e, idx) => {
        setAnchorEl(null);
        setShowMenu(false);
        setSelectedMenuIdx(idx);
    };

    const routes = useMemo(
        () => [
            { name: "Home", path: "/", activeIndex: 0 },
            {
                name: "Services",
                path: "/services",
                activeIndex: 1,
                ariaControls: anchorEl ? "services-menu" : undefined,
                ariaPopup: anchorEl ? true : undefined,
                mouseOver: menuOpenHandler,
            },
            { name: "The Revolution", path: "/revolution", activeIndex: 2 },
            { name: "About Us", path: "/about", activeIndex: 3 },
            { name: "Contact Us", path: "/contact", activeIndex: 4 },
        ],
        [anchorEl]
    );

    useEffect(() => {
        if (props.location.pathname === "/estimate") {
            if (activeRouteIdx !== 5) {
                setActiveRouteIdx(5);
                setSelectedMenuIdx(-1);
            }
            return;
        }
        const tab = [...routes, ...menuOptions].find((tab) => tab.path === props.location.pathname);
        if (activeRouteIdx !== tab.activeIndex) {
            setActiveRouteIdx(tab.activeIndex);
        }
        if (tab.path === "/services" && selectedMenuIdx !== 0) {
            setSelectedMenuIdx(0);
        }
        if (tab.selectedIndex && tab.selectedIndex !== selectedMenuIdx) {
            setSelectedMenuIdx(tab.selectedIndex);
        }
    }, [props.location.pathname, activeRouteIdx, routes, selectedMenuIdx]);

    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button
                            component={Link}
                            to="/"
                            className={classes.logoContainer}
                            disableRipple
                        >
                            <img src={logo} alt="company logo" className={classes.logo} />
                        </Button>
                        {matches ? (
                            <HeaderDrawer routes={routes} activeRouteIdx={activeRouteIdx} />
                        ) : (
                            <HeaderTabs
                                activeRouteIdx={activeRouteIdx}
                                routeChangedHandler={routeChangedHandler}
                                routes={routes}
                                anchorEl={anchorEl}
                                showMenu={showMenu}
                                menuCloseHandler={menuCloseHandler}
                                menuOptions={menuOptions}
                                menuItemClickedHandler={menuItemClickedHandler}
                                selectedMenuIdx={selectedMenuIdx}
                            />
                        )}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </>
    );
};

export default withRouter(Header);
