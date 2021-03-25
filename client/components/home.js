import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import VideoPlayer from "./videoplayer";
import RoomDetails from "./RoomDetails"
import { fetchQueue } from "../store/queue";
import { updateVote } from "../store/vote";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from '@material-ui/core/Button';


//import {CaretDown, CaretUp, HandThumbsDown, HandThumbsUp} from '@styled-icons/bootstrap'
import { ThumbUp, ThumbDown } from './styledIcon'

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      voteType:'',
    };
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
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
    await this.props.updateVote(voteValue, userId, songId, this.props.room);
    if (this.props.voteError !== "") {
      this.handleOpen();
      this.setState({voteType:'upvote'})
    }
  }

  async downVote(voteValue, userId, songId) {
    await this.props.updateVote(voteValue, userId, songId, this.props.room);
    if (this.props.voteError !== "") {
      this.handleOpen();
      this.setState({voteType:'downvote'})
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  render() {
    const { open,voteType } = this.state;
    const { upVote, downVote, handleClose } = this;
    const { userId, voteError, room } = this.props;
    let { queue } = this.props;
    let topThree = queue.slice(0, 3);
    queue = queue.slice(3);
    //console.log("QUEUE", queue);
    return (
      <div>
        <RoomDetails roomId = {room} />
        <h1>Top 3</h1>
        {topThree.map((song) => {
          return (
            <div key={song.id}>
              <p>{song.name}</p>
            </div>
          );
        })}
        <h1>Queue</h1>
        {queue.map((song) => {
          return (
            <div key={song.id}>
              <p>
                <ThumbUp size="48" voteType={this.state.voteType} onClick={() => upVote(1, userId, song.id)} />
                <ThumbDown size="48" voteType={this.state.voteType} onClick={() => downVote(-1, userId, song.id)} />
                {song.name}
                Votes: {song.totalVotes}
              </p>
            </div>
          );
        })}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {voteType==='upvote'?'Already Upvoted! Feel Free To Change Your Vote':'Already Downvoted! Feel Free To Change Your Vote'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => handleClose()}>OK!</Button>
          </DialogActions>
        </Dialog>
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
    voteError: state.voteError,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchQueue: (room) => dispatch(fetchQueue(room)),
    updateVote: async (voteValue, userId, songId, room) => {
      await dispatch(updateVote(voteValue, userId, songId));
      await dispatch(fetchQueue(room));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
