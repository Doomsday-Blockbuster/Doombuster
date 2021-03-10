import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/Auth-Form";
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
    const { isLoggedIn,room } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <PlayQueue/>
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
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
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
    room: state.auth.roomId,
    queue: state.queue,
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
