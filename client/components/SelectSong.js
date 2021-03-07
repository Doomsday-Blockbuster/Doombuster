import React, {useState, useCallback} from "react";
import { connect } from "react-redux";

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
  const [selectedSong, setSong] = useState('');

  const handleClickOpen = (song) => {
    setOpen(true);
    setSong(song);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { username,songs } = props;
  console.log('Songs',songs)
  const videoSrc = `https://www.youtube.com/embed?listType=playlist&list=PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU&autoplay=1`;
  
  return (
    <div>
      <h3>Welcome, {username}</h3>
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
              <button onClick={()=>handleClickOpen(song.snippet.title)}>
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
                    {selectedSong}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>
                    Agree
                  </Button>
                  <Button onClick={handleClose}>
                    Disagree
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
    songs: state.songs
  };
};

export default connect(mapState)(SongList);
