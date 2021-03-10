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


export const loadSongs = (genre) => {
    return async (dispatch) => {
      let response;
      if(genre==='Top50'){
        response = await youtube.get("/playlistItems", {
        params: {
          //2021
          playlistId: "PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU",
          //shower id:K1vKpAvLUr4
          //chillstep: bLNzGxcY658
          //hotgirls: PL2AHJxGoZJdq_gS_KNhXkVBk-MVp1rIPk
        },
        })
      }else if(genre==='HotGirl'){
        response = await youtube.get("/playlistItems", {
          params: {
            playlistId: "PL2AHJxGoZJdq_gS_KNhXkVBk-MVp1rIPk",
          }
        })
      }else if(genre==='Reggae'){
        response = await youtube.get("/playlistItems", {
          params: {
            playlistId: "RDGMEM29nh-so2GiiVvCzzeO3LJQ",
          }
        })
      }else if(genre==='Rock'){
        response = await youtube.get("/playlistItems", {
          params: {
            playlistId: "RDCLAK5uy_mfut9V_o1n9nVG_m5yZ3ztCif29AHUffI",
          }
        })
      }else if(genre==='Workout'){
        response = await youtube.get("/playlistItems", {
          params: {
            playlistId: "PLChOO_ZAB22WAvnFw86vUueyv026ULwIv",
          }
        })
      }else{
      response = await youtube.get("/playlistItems", {
        params: {
          //2021
          playlistId: "PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU",
        },
        })
    }
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
