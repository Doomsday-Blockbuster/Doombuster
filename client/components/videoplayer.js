import React from 'react';
import {connect} from 'react-redux';
import YouTube from 'react-youtube';
import {deleteSongFromQueue} from '../store'

class VideoPlayer extends React.Component {
constructor(){
  super()
  this.videoStateChange = this.videoStateChange.bind(this)
}
  videoOnReady(event) {
    // access to player in all event handlers via event.target
   
   event.target.playVideo();
  }

  videoStateChange(event){
    if(event.data===0){
      this.props.deleteSongFromQueue(this.props.queue[0],this.props.auth.roomId)
      // event.target.loadVideoById({
      //   videoId:'ZmDBbnmKpqQ'
      // })
    }
    console.log('EVENT',event.data)
  }
  render() {
    console.log('QUEUE',this.props.queue)
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
   // console.log(this.props)
    const {videoId} = this.props
    console.log('VIDEOID: ',videoId)
    return <YouTube 
    videoId={videoId}
    opts={opts} 
    onReady={this.videoOnReady}
    onStateChange={this.videoStateChange} />;
  }
}

const mapState = state => state

const mapDispatch = (dispatch, {history}) => {
  return {
    deleteSongFromQueue: (song,room) => dispatch(deleteSongFromQueue(song,room,history)),
  }
};

export default connect(mapState,mapDispatch)(VideoPlayer)