import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  main:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    height:'100vh'
  },
  form: {
    display:'flex',
    flexDirection:'column',
    width:'200px'
  },
  button: {
    margin:'1rem'
  },
})

/**
 * COMPONENT
 */
class AuthForm extends React.Component{
  constructor(props){
    super()
    this.state ={
      roomOption:'',
      roomOptionSelected:0,
      roomCode:0
    }
    this.selectRoomOption=this.selectRoomOption.bind(this)
    this.handleChange=this.handleChange.bind(this)
  } 

  selectRoomOption(ev){
    const roomOption = ev.target.innerHTML
    if(roomOption==='Create New Room'){
      this.setState({roomOption:'newRoom'})
    }
    if(roomOption==='Enter Existing Room'){
      this.setState({roomOption:'enterRoom'})
    }  
  }

  async handleChange(ev){
    this.setState({roomCode:ev.target.value})
  }

  render(){
    const {name, displayName, handleSubmit, error, classes} = this.props
    const {selectRoomOption,handleChange} = this
    const {roomOption,roomCode} = this.state
  // const googleURL = window.googleClientId? `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube&response_type=code&redirect_uri=http://localhost:8080/auth/youtube/callback&client_id=${window.googleClientId}` : null;
  //  console.log(googleURL)
    return (
      <div className={classes.main}>
        {!roomOption?(
        <div className={classes.form}>
        <TextField style={{textAlign:'center'}} label='Enter Room Code' onChange={(ev)=>handleChange(ev)}/>
        <Button className = {classes.button} color="primary" variant="contained" onClick={selectRoomOption}>Create New Room</Button>
        <Button color="primary" variant="contained" onClick={selectRoomOption}>Enter Existing Room</Button>
        </div>
        ):null}
        {roomOption?(<form onSubmit={(ev)=>handleSubmit(ev,roomOption,roomCode)} name={name}>
          <div className={classes.form}>
            <TextField label = 'Enter Username' name="username" type="text" />
            <TextField label = 'Enter Password' name="password" type="password" />
            <Button className = {classes.button} color="primary" variant="contained" type="submit">{displayName}</Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>):null}
        {/* {
          window.googleClientId && <a href={googleURL}>Login / Register Via Google </a>
        } */}
      </div>
    )
  }
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
    handleSubmit(evt,roomOption,roomCode) {
      evt.preventDefault()
      console.log(roomOption)
      console.log(roomCode)
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      // const roomCode = evt.target.roomCode.value
      // const roomOption = evt.target.roomOption.value
      dispatch(authenticate(username, password, formName, roomCode, roomOption))
    }
  }
}

export const Login = withStyles(styles)(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withStyles(styles)(connect(mapSignup, mapDispatch)(AuthForm))
