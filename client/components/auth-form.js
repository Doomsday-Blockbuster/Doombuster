import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const googleURL = window.googleClientId? `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube&response_type=code&redirect_uri=http://localhost:8080/auth/youtube/callback&client_id=${window.googleClientId}` : null;
//  console.log(googleURL)
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <select name='roomOption'>
            <option value='newRoom'>Create a New Room</option>
            <option value='enterRoom'>Enter Existing Room</option>
          </select>
        </div>
        <div>
          <label htmlFor="roomCode">
            <small>Room Code</small>
          </label>
          <input name="roomCode" type="text" />
        </div>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* {
        window.googleClientId && <a href={googleURL}>Login / Register Via Google </a>
      } */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      const roomCode = evt.target.roomCode.value
      const roomOption = evt.target.roomOption.value
      dispatch(authenticate(username, password, formName, roomCode, roomOption))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
