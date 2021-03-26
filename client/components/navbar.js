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
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  colorPrimary:{
    // backgroundColor:'#101b61'
    backgroundColor:'#050e4a'
  },
  titles: {
    display:'flex',
    justifyContent:'space-between',
    width:'30%vw'
  },
  title: {
    fontFamily:'Plane Crash',
    fontSize:'2em',
    color:'white',
    opacity:'75%',
    textShadow:'6px 2px black',
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const { handleClick, isLoggedIn, room, otherProps, username } = props;
  return (
    <div id='navbar'>
      {isLoggedIn ? (
        <div>
          <AppBar position="fixed" className={classes.colorPrimary}>
            <Toolbar className={classes.root}>
              {/* <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton> */}
               {/* <Typography className={classes.title}>
                DOOMBUSTER
              </Typography> */}
              {/* <div className={classes.titles}> */}
              <Typography>
                <Link to={`/home/${room}`} className='navtitles'>queue</Link>
              </Typography>
              <Typography>
                <Link to={`/select/${room}`} className='navtitles'>select a song</Link>
              </Typography>
              {/* </div> */}
              <Typography>
                <a href="#" onClick={() => handleClick(room, username)} className='navtitles'>
                  logout
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
