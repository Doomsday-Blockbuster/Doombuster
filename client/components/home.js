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

  async upVote(voteValue, userId, songId) {
    await this.props.updateVote(voteValue, userId, songId,this.props.room);
    if(this.props.voteError!==''){
      alert('Already Voted')
    }
  }

  async downVote(voteValue, userId, songId) {
    await this.props.updateVote(voteValue, userId, songId,this.props.room);
    if(this.props.voteError!==''){
      alert('Already Voted')
    }
  }

  render() {
    const { upVote, downVote} = this;
    const { userId, voteError} = this.props;
    let {queue} = this.props
    let topThree = queue.slice(0,3)
    queue = queue.slice(3);
    console.log("QUEUE", queue);
    return (
      <div>
        <h1>Top 3</h1>
        {topThree.map((song)=>{
          return (
            <div key={song.id}>
              <p>
                {song.name}
              </p>
            </div>
          );
        })}
        <h1>Queue</h1>
        {queue.map((song) => {
          return (
            <div key={song.id}>
              <p>
                
                {song.name}
                <button onClick={() => upVote(1, userId, song.id)}>+</button>
                <button onClick={() => downVote(-1, userId, song.id)}>-</button>
                 Votes: {song.totalVotes}
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
    voteError:state.voteError
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchQueue: (room) => dispatch(fetchQueue(room)),
    updateVote: async(voteValue, userId, songId, room) => {
      await dispatch(updateVote(voteValue, userId, songId));
      await dispatch(fetchQueue(room))
    }
  };
};

export default connect(mapState, mapDispatch)(Home);
