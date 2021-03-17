import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */
const FIND_ROOM = 'FIND_ROOM'

/**
 * ACTION CREATORS
 */
const findRoom = () => ({type: SET_AUTH, auth})

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