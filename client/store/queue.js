import axios from 'axios'
import history from '../history'

const FETCH_QUEUE = 'ADD_SONG_TO_QUEUE'
const ADD_SONG_TO_QUEUE = 'ADD_SONG_TO_QUEUE'
// const DELETE_FROM_QUEUE = 'DELETE_FROM_QUEUE' //EMPTY--NEEDS WORK ON THUNK

//action creators
export const _fetchQueue = (queue) => {
  return {
    type: FETCH_QUEUE,
    queue
  }
}


export const _addToQueue = (song) => {
  return {
    type: ADD_SONG_TO_QUEUE,
    song
  };
};

// export const _deleteFromQueue = (song) => {
//   return {
//     type: DELETE_FROM_QUEUE,
//     song
//   }
// }

//thunk creators
export const fetchQueue = (room) => {
  return async(dispatch) => {
    const queue = (await axios.get(`/api/queue/${room}`)).data;
    dispatch(_fetchQueue(queue));
  }
}

export const addToQueue = (room,song,history) => {
  //console.log(song)
  //console.log(`store` + typeof room)
  return async(dispatch) => {
    console.log('in dispatch')
    const songReturned = (await axios.post(`/api/queue/${room}`, {name: song.title, description: song.description, image: song.thumbnail})).data;
    console.log(songReturned)
    dispatch(_addToQueue(songReturned));
    history.push(`/home`)
  }
}

// export const deleteFromQueue = (song, history) => {
//   return async(dispatch) => {
//     await axios.delete(`/api/queue`,{data: {song}})
//     dispatch(_deleteFromQueue(song));
//     history.push('/home');
//   }
// }


//reducer
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_QUEUE:
      return action.queue
    case ADD_SONG_TO_QUEUE:
      return [...state, action.song]
    // case DELETE_FROM_QUEUE:
    //   return state.filter(clip=>clip.id != song.id)
    default:
      return state
  }
}