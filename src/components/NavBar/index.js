import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "70px",
        backgroundColor: "hsla(0, 0%, 100%, 0.95)",
        boxShadow: "0 1px 12px -10px #000",
    },
    logo: {
        height: theme.spacing(2.4),
        marginLeft: theme.spacing(1.2),
        cursor: "pointer",
    }
}));

/**
 * NavBar Component
 */
const NavBar = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <img
                className={classes.logo}
                // eslint-disable-next-line no-undef
                src={process.env.PUBLIC_URL + "logo.png"}
                alt="logo" />
        </Box>
    );
};

export default NavBar;
