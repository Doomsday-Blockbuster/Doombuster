import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import VideoPlayer from './videoplayer';
import VideoPlayer2 from './videoplayer2';
import {fetchQueue} from '../store/queue'



export class Home extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const {room} = this.props
    this.props.fetchQueue(room)
  }

  render(){
    const {test} = this.props
    const { username, queue } = this.props
    return (
      <div>
        <h1>Queue</h1>
        {
          queue.map(song=>{
            return (
              <div>
                <p>{song.name? song.name : "loading"}</p>
              </div>
            )
          })
        }
      </div>
  )}
}

const mapState = (state) => {
  return {
    username: state.auth.username,
    room: state.auth.roomId,
    queue: state.queue,
    test: state.auth
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    fetchQueue: (room) => dispatch(fetchQueue(room)),
  }
};

export default connect(mapState,mapDispatch)(Home);