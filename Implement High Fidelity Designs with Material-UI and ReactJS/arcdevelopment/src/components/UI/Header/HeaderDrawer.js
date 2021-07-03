import React, { useState } from "react";
import { Link } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

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
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    drawerIcon: {
        height: "50px",
        width: "50px",
    },
    drawer: {
        backgroundColor: theme.palette.common.blue,
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7,
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange,
    },
    drawerItemSelected: {
        "& .MuiListItemText-root": {
            opacity: 1,
        },
    },
}));

const HeaderDrawer = ({ routes, activeRouteIdx }) => {
    const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(false);
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{ paper: classes.drawer }}
            >
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    {routes.map((route, idx) => (
                        <ListItem
                            divider
                            button
                            onClick={() => setOpenDrawer(false)}
                            component={Link}
                            to={route.path}
                            key={route.name}
                            selected={route.activeIndex === activeRouteIdx}
                            classes={{ selected: classes.drawerItemSelected }}
                        >
                            <ListItemText className={classes.drawerItem} disableTypography>
                                {route.name}
                            </ListItemText>
                        </ListItem>
                    ))}
                    <ListItem
                        onClick={() => setOpenDrawer(false)}
                        divider
                        button
                        component={Link}
                        to="/estimate"
                        selected={activeRouteIdx === 5}
                        classes={{
                            root: classes.drawerItemEstimate,
                            selected: classes.drawerItemSelected,
                        }}
                    >
                        <ListItemText className={classes.drawerItem} disableTypography>
                            Free Estimate
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton
                onClick={() => setOpenDrawer((prevVal) => !prevVal)}
                disableRipple
                className={classes.drawerIconContainer}
            >
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </>
    );
};

export default HeaderDrawer;
