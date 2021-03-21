import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "./videoplayer";

class PlayQueue extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { queue, isAdmin } = this.props;
    console.log(queue);
    return (
      <div id="player">
        {isAdmin ? (
          <div>
            {queue.length > 0 ? (
              <VideoPlayer videoId={queue.length ? queue[0].videoId : ""} />
            ) : (
              <img id='placeholder' src="../placeholder.jpg" />
            )}
          </div>
        ) : (
          <div>
            {queue.length > 0 ? (
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <h3>{queue[0].name}</h3>
                <img id='largeThumbnail' src={queue[0].largeImage} />
                <h3>CURRENTLY PLAYING</h3>
              </div>
            ) : (
              <div>
                <img id='placeholder' src="../placeholder.jpg" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin,
    queue: state.queue,
  };
};

export default connect(mapState)(PlayQueue);
