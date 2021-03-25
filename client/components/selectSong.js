import React, {useState, useCallback, useEffect} from "react";
import { connect } from "react-redux";
import {addToQueue} from '../store/queue'
import {loadSongs} from '../store/songs'
import VideoPlayer from './videoplayer'
//import socketIOClient from "socket.io-client"

//material ui
import { withStyles,createMuiTheme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledButton = withStyles({
  root: {
    color: 'black',
    backgroundColor: 'white',
    margin: '1rem'
  }
})(Button)

/**
 * COMPONENT
 */

export const SongList = (props) => {

  const [open, setOpen] = useState(false);
  const [selectedSong, setSong] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');

  const repeatSong = (song) =>{
    const inqueue = queue.find(ele=>ele.name===song.title)
    if(inqueue){
      return true
    }else{
      return false
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //popup
  const handleClickOpen = (song) => {
    setSong({title: song.title, description: song.description, thumbnail: song.thumbnails.medium.url, largeThumbnail: song.thumbnails.high.url, videoId:song.resourceId.videoId});
    
    //if(queue.length<=10){
      setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
  }


  const { username,songs,queue,addToQueue,loadSongs} = props;

  const room = props.room;
  const videoSrc = `https://www.youtube.com/embed?listType=playlist&list=PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU&autoplay=1`;
  
  const filteredSongs = songs.filter(song=>{
    return song.snippet.title.toLowerCase().includes(search);
  })

  return (
    <div>
      <div id="options">
      <div id="select-playlist">
      <StyledButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
        Select A Playlist
      </StyledButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=>{return loadSongs('Top50'),handleMenuClose()}}>Top 50 of 2021</MenuItem>
        <MenuItem onClick={()=>{return loadSongs('Soundbath'), handleMenuClose()}}>Soundbath</MenuItem>
        <MenuItem onClick={()=>{return loadSongs('Workout'), handleMenuClose()}}>Workout</MenuItem>
        <MenuItem onClick={()=>{ return loadSongs('Reggae'), handleMenuClose()}}>Reggae</MenuItem>
        <MenuItem onClick={()=>{return loadSongs('Rock'), handleMenuClose()}}>Rock</MenuItem>
      </Menu>
      </div>
      <div id= 'search'>
        <form id='search-form'>
            <input id = 'searchbar' type ='text' name='searchbar' placeholder = 'Search for Song in Playlist' value={search} onChange={(e)=>handleSearch(e)} />
        </form>
      </div>
      </div>

      <h3>Select A Song, {username}</h3>
      <div id="content">
        <div id="channel-data"></div>
      </div>
      <div id="songList">
        {filteredSongs.map(song=>{
          const videoSrc = `https://www.youtube.com/embed/${song.snippet.resourceId.videoId}`;
          return(
            <div key={song.id}>
              <button onClick={()=>handleClickOpen(song.snippet)}>
                <img src={song.snippet.thumbnails.medium.url} alt={song.snippet.description}/>
                <p className="choice-title">{song.snippet.title}</p>
              </button>
             </div>
          )  
        })}

          {/* //material ui confirm song popup box */}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="confirm-add-song"
                aria-describedby="confirm-add-song"
              >


                  {/* //queue.length <= 10 && !repeatSong(selectedSong)? */}
                {repeatSong(selectedSong)?
                (
                  <div>
                  <DialogTitle id="error-repeat">Poor Taste! JK. Song is already in queue. Please choose another!</DialogTitle>
                  <DialogActions>
                    <Button onClick={()=>handleClose()}>
                      OK
                    </Button>
                  </DialogActions>
                </div>
                )
                : queue.length>10?
                (
                  <div>
                  <DialogTitle id="error-full">Poor Taste! JK. Queue is too full. Come back soon!</DialogTitle>
                  <DialogActions>
                    <Button onClick={()=>handleClose()}>
                      OK
                    </Button>
                  </DialogActions>
                </div>
                )
                :
                (
                  <div>
                    <DialogTitle id="add-song">Add this song to the room?</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="add-song-description">
                        {selectedSong.title}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={()=>{
                        return(
                          addToQueue(room,selectedSong),
                          handleClose()
                        )
                        }}>
                        Yes
                      </Button>
                      <Button onClick={handleClose}>
                        Put it back
                      </Button>
                    </DialogActions>
                </div>
                )
              }
              </Dialog>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state,otherProps) => {
  return {
    username: state.auth.username,
    room: otherProps.match.params.id,
    songs: state.songs,
    queue: state.queue
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    // addToQueue: (room,song) => {
    //   socket.emit('SelectSong',room,song)
    //   history.push(`/home/${room}`)},
    addToQueue: (room,song) => dispatch(addToQueue(room,song,history)),
    loadSongs: (genre)=>dispatch(loadSongs(genre))
  }
};

export default connect(mapState,mapDispatch)(SongList);
