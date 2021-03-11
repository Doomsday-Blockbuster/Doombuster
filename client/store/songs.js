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
      switch(genre){
        case 'Top50':
          response = await youtube.get("/playlistItems", {
              params: {
                //2021
                playlistId: "PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU",
              },
          })
          break
        case 'Soundbath':
          response = await youtube.get("/playlistItems", {
                params: {
                  playlistId: "PL_4s4N3ooC9T0Roc-lnB_nYESCSPzh-nB",
                }
          })
          break
        case "Reggae":
          response = await youtube.get("/playlistItems", {
            params: {
              playlistId: "RDGMEM29nh-so2GiiVvCzzeO3LJQ",
            }
          })
          break
        case "Rock":
          response = await youtube.get("/playlistItems", {
            params: {
              playlistId: "RDCLAK5uy_mfut9V_o1n9nVG_m5yZ3ztCif29AHUffI",
            }
          })
          break
        case "Workout":
          response = await youtube.get("/playlistItems", {
            params: {
            playlistId: "RDCLAK5uy_mfut9V_o1n9nVG_m5yZ3ztCif29AHUffI",
          }
        })
        break
        default:
          response = await youtube.get("/playlistItems", {
            params: {
              //2021
              playlistId: "PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU",
            },
        })
        break
      }
      // if(genre==='Top50'){
      //   response = await youtube.get("/playlistItems", {
      //   params: {
      //     //2021
      //     playlistId: "PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU",
      //   },
      //   })
      // }else if(genre==='Soundbath'){
      //   response = await youtube.get("/playlistItems", {
      //     params: {
      //       playlistId: "PL_4s4N3ooC9T0Roc-lnB_nYESCSPzh-nB",
      //     }
      //   })
      // }else if(genre==='Reggae'){
      //   response = await youtube.get("/playlistItems", {
      //     params: {
      //       playlistId: "RDGMEM29nh-so2GiiVvCzzeO3LJQ",
      //     }
      //   })
      // }else if(genre==='Rock'){
      //   response = await youtube.get("/playlistItems", {
      //     params: {
      //       playlistId: "RDCLAK5uy_mfut9V_o1n9nVG_m5yZ3ztCif29AHUffI",
      //     }
      //   })
      // }else if(genre==='Workout'){
      //   response = await youtube.get("/playlistItems", {
      //     params: {
      //       playlistId: "RDCLAK5uy_mfut9V_o1n9nVG_m5yZ3ztCif29AHUffI",
      //     }
      //   })
      // }else{
      // response = await youtube.get("/playlistItems", {
      //   params: {
      //     //2021
      //     playlistId: "PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU",
      //   },
      //   })
      // }
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
