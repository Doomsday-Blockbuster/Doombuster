import axios from "axios";
import history from "../history";


const UPDATE_VOTE = "UPDATE_VOTE";

/**
 * ACTION CREATORS
 */
const _updateVote = (vote) => ({ type: UPDATE_VOTE, voteValue });

//Click on buton >> it calls a method called UPDATEVOTE
//It either needs a valye of -1, 0, 1
//

//thunk creators
export const updateVote = (voteValue, userId, songId) => {
  return async (dispatch) => {
    const vote = (await axios.post(`/api/vote/`, { voteValue, userId, songId }))
      .data;
      socket.emit('QueueUpdated')
    //dispatch(_updateVote(vote));
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_VOTE:
      return action.vote;
    default:
      return state;
  }
}
