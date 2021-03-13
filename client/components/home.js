import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import VideoPlayer from './videoplayer';
import {fetchQueue} from '../store/queue'



export class Home extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const {room} = this.props
    this.props.fetchQueue(room)
    socket.on('SongSelected',()=>{
      this.props.fetchQueue(room)
      console.log('new queue fetched after for websocket')
    })
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
              <div key={song.id}>
                <p>{song.name}</p>
              </div>
            )
          })
        }
      </div>
  )}
}

const mapState = (state,otherProps) => {
  return {
    username: state.auth.username,
    room: otherProps.match.params.id,
    queue: state.queue,
    test: state.auth,
    otherProps
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    fetchQueue: (room) => dispatch(fetchQueue(room)),
  }
};

export default connect(mapState,mapDispatch)(Home);