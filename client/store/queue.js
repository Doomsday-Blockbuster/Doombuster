import axios from 'axios'
import history from '../history'

const FETCH_QUEUE = 'FETCH_QUEUE'
const ADD_SONG_TO_QUEUE = 'ADD_SONG_TO_QUEUE'
const DELETE_SONG_FROM_QUEUE = 'DELETE_SONG_FROM_QUEUE'
// const DELETE_FROM_QUEUE = 'DELETE_FROM_QUEUE' //EMPTY--NEEDS WORK ON THUNK

//action creators
export const _fetchQueue = (queue) => {
  return {
    type: FETCH_QUEUE,
    queue
  }
}

//thunk creators
export const fetchQueue = (room) => {
  return async(dispatch) => {
    const queue = (await axios.get(`/api/queue/${room}`)).data;
    dispatch(_fetchQueue(queue));
  }
}

export const addToQueue = (room,song,history) => {
  return async(dispatch) => {
    //removed because this addSong is now done in the websocket
    //const queue = (await axios.post(`/api/queue/${room}`, {name: song.title, description: song.description, image: song.thumbnail, videoId:song.videoId})).data;
    //dispatch(_addToQueue(queue));
    history.push(`/select`)
  }
}

export const deleteSongFromQueue = (song, room, history) => {
  return async(dispatch) => {
    await axios.delete(`/api/queue/${song.id}`)
    const queue = (await axios.get(`/api/queue/${room}`)).data;
    dispatch(_fetchQueue(queue));
  }
}


//reducer
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_QUEUE:
      return action.queue
    default:
      return state
  }
}