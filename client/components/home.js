import React from "react";
import { connect } from "react-redux";



/**
 * COMPONENT
 */

export const Home = (props) => {
  const { username,songs } = props;
  console.log('Songs',songs)
  const videoSrc = `https://www.youtube.com/embed?listType=playlist&list=PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU&autoplay=1`;
  return (
    <div>
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
