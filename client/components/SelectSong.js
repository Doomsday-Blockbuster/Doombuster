import React, {useState, useCallback} from "react";
import { connect } from "react-redux";
import {addToQueue} from '../store/queue'

//material ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



/**
 * COMPONENT
 */

export const SongList = (props) => {

  const [open, setOpen] = useState(false);
  const [selectedSong, setSong] = useState({});

  const handleClickOpen = (song) => {
    console.log(song)
    setOpen(true);
    setSong({title: song.title, description: song.description, thumbnail: song.thumbnails.medium.url});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { username,songs,room } = props;
  console.log(typeof room)
  console.log('Songs',songs)
  const videoSrc = `https://www.youtube.com/embed?listType=playlist&list=PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU&autoplay=1`;
  
  return (
    <div>
      <h3>Choose A Song, {username}</h3>
      <div id="content">
        <div id="channel-data"></div>
      </div>
      <div id="songList">
      {/* <iframe src={videoSrc} allowFullScreen title='Video player'/> */}
        {songs.map(song=>{
          const videoSrc = `https://www.youtube.com/embed/${song.snippet.resourceId.videoId}`;
          return(
            <div>
              {/* <iframe src={videoSrc} allowFullScreen title='Video player'/> */}
              <button onClick={()=>handleClickOpen(song.snippet)}>
                <img src={song.snippet.thumbnails.medium.url} alt={song.snippet.description}/>
              </button>
             </div>
          )  
        })}

          //material ui confirm song popup box
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="add-song">Add this song to the room?</DialogTitle>
                <DialogContent>
                  <DialogContentText id="add-song-description">
                    {selectedSong.title}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>addToQueue(room,selectedSong)}>
                    Yes!
                  </Button>
                  <Button onClick={handleClose}>
                    Put it back
                  </Button>
                </DialogActions>
              </Dialog>
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
    room: state.auth.roomId,
    songs: state.songs,
    queue: state.queue
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    addToQueue: (room,song) => dispatch(addToQueue(room,song,history)),
  }
};

export default connect(mapState)(SongList);
