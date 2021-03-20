import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const { handleClick, isLoggedIn, room, otherProps, username } = props;
  return (
    <div>
      {isLoggedIn ? (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <Link to={`/home/${room}`}>Home</Link>
              </Typography>

              <Typography variant="h6" className={classes.title}>
                <Link to={`/select/${room}`}>Choose a Song</Link>
              </Typography>
              <Typography variant="h6" className={classes.title}>
                <a href="#" onClick={() => handleClick(room, username)}>
                  Logout
                </a>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state, otherProps) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    room: window.location.pathname.slice(-1) * 1,
    otherProps,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick(room, username) {
      dispatch(logout(room, username));
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
