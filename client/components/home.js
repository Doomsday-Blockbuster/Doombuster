import React from "react";
import { connect } from "react-redux";
import VideoPlayer from './videoplayer';
import VideoPlayer2 from './videoplayer2';



/**
 * COMPONENT
 */


export const Home = (props) => {
  const { username,songs } = props;
  console.log('Songs',songs)
  const videoSrc = `https://www.youtube.com/embed?listType=playlist&list=PLRmBqz1N9GJk3a3xgXcUox88Mso89zf0F`;
  return (
    <div>
      {/* <VideoPlayer/> */}
      {/* <VideoPlayer2/> */}
      <h3>Welcome, {username}</h3>
      <div id="content">
        <div id="channel-data"></div>
      </div>
      <div>
      <iframe src={videoSrc} allowFullScreen title='Video player'/>
        {songs.map(song=>{
          const videoSrc = `https://www.youtube.com/embed/${song.snippet.resourceId.videoId}`;
          return(
            // <iframe src={videoSrc} allowFullScreen title='Video player'/>
             <img src={song.snippet.thumbnails.medium.url} alt={song.snippet.description}/>
          )
        })}
      </div>
    </div>
  );
};




/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log(state)
  return {
    username: state.auth.username,
    songs: state.songs
  };
};

export default connect(mapState)(Home);
