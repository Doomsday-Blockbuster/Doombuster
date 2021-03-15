import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
// import { Login, Signup } from "./components/Auth-Form";
import { LandingPage } from "./components/Auth-Form";
import SelectSong from "./components/SelectSong";
import Home from "./components/Home";
import { me, loadSongs, fetchQueue } from "./store";
import PlayQueue from './components/playqueue'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn,isAdmin,room, roomAdmin} = this.props;

    return (
      <div>
        {isLoggedIn && isAdmin? (
          <div>
          <h3>Room Admin: {roomAdmin}</h3>
          <PlayQueue/>
          </div>
        ) : (
          ""
        )}
        {isLoggedIn ? (
          <Switch>
            <Route path="/home/:id" component={Home} />
            <Route path="/select/:id" component={SelectSong} />
            <Redirect to={`/home/${room}`} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Redirect to={`/`} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state,otherProps) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin,
    room: state.auth.roomId,
    queue: state.queue,
    roomAdmin : state.auth.username
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(loadSongs());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
