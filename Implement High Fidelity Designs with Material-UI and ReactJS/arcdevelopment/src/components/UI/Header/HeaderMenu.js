import React from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px",
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1,
        },
    },
}));

const HeaderMenu = ({
    anchorEl,
    showMenu,
    menuCloseHandler,
    menuOptions,
    menuItemClickedHandler,
    selectedMenuIdx,
    activeRouteIdx,
}) => {
    const classes = useStyles();

    return (
        <Menu
            id="services-menu"
            anchorEl={anchorEl}
            keepMounted
            open={showMenu}
            onClose={menuCloseHandler}
            MenuListProps={{ onMouseLeave: menuCloseHandler }}
            classes={{ paper: classes.menu }}
            style={{ zIndex: 1302 }}
            elevation={0}
        >
            {menuOptions.map((option, idx) => (
                <MenuItem
                    key={idx}
                    onClick={(e) => menuItemClickedHandler(e, idx)}
                    selected={option.selectedIndex === selectedMenuIdx && activeRouteIdx === 1}
                    component={Link}
                    to={option.path}
                    classes={{ root: classes.menuItem }}
                >
                    {option.name}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default HeaderMenu;
