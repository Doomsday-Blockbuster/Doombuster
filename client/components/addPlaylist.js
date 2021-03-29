import React,{useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {loadPlaylists} from '../store'

export const AddPlaylist = (props) => {
console.log('PROPS',props)
const [playlistName,SetName] = useState('');
const [playlistUrl,SetUrl] = useState('')
const handleChange = (ev) =>{
    if(ev.target.name==='name'){
        SetName(ev.target.value)
    }
    if(ev.target.name==='url'){
        SetUrl(ev.target.value)
    }
}

const handleSubmit = async (ev) => {
    try{
        ev.preventDefault();
        const playlist = (await axios.post('/api/playlists',{playlistName,playlistUrl})).data
        props.setAdd(false);
        props.loadPlaylists();
    }catch(ex){
        console.log(ex)
    }
}
    return (
        <div>
            <label style={{color:'white'}}>Playlist Name</label>
            <input name='name' value={playlistName} onChange={(ev)=>handleChange(ev)}></input>
            <label style={{color:'white'}}>Playlist Id</label>
            <input name='url' value={playlistUrl} onChange={(ev)=>handleChange(ev)}></input>
            <button onClick = {handleSubmit}>Submit</button>
        </div>
    )
}

const mapDispatch = (dispatch) => {
    return{
        loadPlaylists: () => dispatch(loadPlaylists())
    }
}

export default connect(null,mapDispatch)(AddPlaylist)