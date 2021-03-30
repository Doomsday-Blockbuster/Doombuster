import axios from 'axios'
import { useReducer } from 'react'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method, roomCode, roomOption) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password, roomCode, roomOption})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
   // console.log('ERROR',authError)
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = (room,username)=> {
  return async(dispatch) => {
    // console.log("roooomba" , room)
    // console.log('username',username)

    await axios.put(`/api/users/${room}`,{username})
    //const roomPeeps = await axios.get(`/api/users/${room}`)
    //console.log(`room peeps`,roomPeeps.data)
    dispatch(_logout());
  }
}

export const _logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
