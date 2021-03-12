import React from 'react';
import {connect} from 'react-redux';
import VideoPlayer from "./videoplayer";

class PlayQueue extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {queue} = this.props
    return (
      <div>
        <VideoPlayer videoId={queue.length ? queue[0].videoId : ""} />
      </div>
    )
  }
}

const mapstate = (state) => state;

export default connect(mapstate)(PlayQueue);
