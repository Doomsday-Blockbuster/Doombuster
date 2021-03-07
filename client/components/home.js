import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import {fetchQueue} from '../store/queue'



export class Home extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const {room} = this.props
    console.log(`homeroom` + typeof room)
    this.props.fetchQueue(1)
  }

  render(){
    console.log(`*****` , this.props)
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

const mapState = (state) => {
  return {
    username: state.auth.username,
    room: state.auth.roomId,
    queue: state.queue
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    fetchQueue: (room) => dispatch(fetchQueue(room)),
  }
};

export default connect(mapState,mapDispatch)(Home);