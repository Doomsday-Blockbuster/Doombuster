import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import VideoPlayer from "./videoplayer";
import { fetchQueue } from "../store/queue";
import { updateVote } from "../store/vote";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  async componentDidMount() {
    const { room } = this.props;
    socket.on("RefreshQueue", async () => {
      await this.props.fetchQueue(room);
      console.log("new queue fetched after for websocket");
    });
    await this.props.fetchQueue(room);
  }

  upVote(voteValue, userId, songId) {
    this.props.updateVote(voteValue, userId, songId);
  }

  downVote(voteValue, userId, songId) {
    this.props.updateVote(voteValue, userId, songId);
  }

  render() {
    const { upVote, downVote } = this;
    const { userId } = this.props;
    const { username, queue } = this.props;
    return (
      <div>
        <h1>Queue</h1>
        {queue.map((song) => {
          return (
            <div key={song.id}>
              <p>
                {song.name}
                <button onClick={() => upVote(1, userId, song.id)}>+</button>
                <button onClick={() => downVote(-1, userId, song.id)}>-</button>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state, otherProps) => {
  return {
    username: state.auth.username,
    room: otherProps.match.params.id,
    queue: state.queue,
    userId: state.auth.id,
    otherProps,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchQueue: (room) => dispatch(fetchQueue(room)),
    updateVote: (voteValue, userId, songId) =>
      dispatch(updateVote(voteValue, userId, songId)),
  };
};

export default connect(mapState, mapDispatch)(Home);
