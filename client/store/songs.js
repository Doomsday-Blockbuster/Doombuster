import axios from 'axios'
import history from '../history'
import youtube from "../api/youtube";


const LOAD_SONGS = 'LOAD_SONGS'

/**
 * ACTION CREATORS
 */
const _loadSongs = (songs) => ({type: LOAD_SONGS, songs})

/**
 * THUNK CREATORS
 */
export const loadSongs = () => {
    return async (dispatch) => {
        const response = await youtube.get("/playlistItems", {
        params: {
          playlistId: "PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU",
        },
        });
        return dispatch(_loadSongs(response.data.items))
  }
}


/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_SONGS:
      return action.songs
    default:
      return state
  }
}
