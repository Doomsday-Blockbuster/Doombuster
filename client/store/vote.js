import axios from "axios";
import history from "../history";

const UPDATE_VOTE = "UPDATE_VOTE";

/**
 * ACTION CREATORS
 */
const _updateVote = (vote) => ({ type: UPDATE_VOTE, voteValue });

/**
 * THUNK CREATORS
 */

//Click on buton >> it calls a method called UPDATEVOTE
//It either needs a valye of -1, 0, 1
//

export const loadSongs = (genre) => {
  return async (dispatch) => {
    let response;
    switch (genre) {
      case "Top50":
        response = await youtube.get("/playlistItems", {
          params: {
            //2021
            playlistId: "PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU",
          },
        });
        break;
      case "Soundbath":
        response = await youtube.get("/playlistItems", {
          params: {
            playlistId: "PL_4s4N3ooC9T0Roc-lnB_nYESCSPzh-nB",
          },
        });
        break;
      case "Reggae":
        response = await youtube.get("/playlistItems", {
          params: {
            playlistId: "RDGMEM29nh-so2GiiVvCzzeO3LJQ",
          },
        });
        break;
      case "Rock":
        response = await youtube.get("/playlistItems", {
          params: {
            playlistId: "RDCLAK5uy_mfut9V_o1n9nVG_m5yZ3ztCif29AHUffI",
          },
        });
        break;
      case "Workout":
        response = await youtube.get("/playlistItems", {
          params: {
            playlistId: "RDCLAK5uy_mfut9V_o1n9nVG_m5yZ3ztCif29AHUffI",
          },
        });
        break;
      default:
        response = await youtube.get("/playlistItems", {
          params: {
            //2021
            playlistId: "PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU",
          },
        });
        break;
    }
    return dispatch(_loadSongs(response.data.items));
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_SONGS:
      return action.songs;
    default:
      return state;
  }
}
