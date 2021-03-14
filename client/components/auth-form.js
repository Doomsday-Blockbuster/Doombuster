import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel} from '@material-ui/core';
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
    alignItems:'center',
    width:'500px'
  },
  radioButton: {
    display:'flex',
    justifyContent:'center'
  },
  button: {
    margin:'1rem',
    width:'100px'
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
      roomCode:0,
      formName:'login'
    }
    this.selectRoomOption = this.selectRoomOption.bind(this)
    this.selectFormName = this.selectFormName.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitRoomOption = this.submitRoomOption.bind(this)
  } 

  selectRoomOption(ev){
    const roomOption = ev.target.value
    this.setState({roomOption})
  }

  selectFormName(ev){
    const formName = ev.target.value
    this.setState({formName})
  }

  async handleChange(ev){
    const roomCode = ev.target.value
    this.setState({roomCode})
  }

  async submitRoomOption(ev){
    this.setState({roomOptionSelected:1})
  }

  render(){
    const {name, displayName, handleSubmit, error, classes} = this.props
    const {selectRoomOption,selectFormName,handleChange,submitRoomOption} = this
    const {roomOption,roomCode,formName,roomOptionSelected} = this.state
    return (
      <div className={classes.main}>
        {!roomOptionSelected?(
          <div className={classes.form}>
            <div className = {classes.radioButton}>
            <FormControl component="fieldset">
                <RadioGroup row onChange={selectRoomOption}>
                  <FormControlLabel value="enterRoom" control={<Radio />} label="Enter Existing Room" />
                  <FormControlLabel value="newRoom" control={<Radio />} label="Create New Room" />
                </RadioGroup>
            </FormControl>
            </div>
          {roomOption?(
            <TextField style={{textAlign:'center'}} label='Enter Room Code' onChange={(ev)=>handleChange(ev)}/>
            ):null}
          <Button className = {classes.button} color="primary" variant="contained" onClick={submitRoomOption}>SUBMIT</Button>
        </div>
        ):null}
        {(roomOptionSelected)?(
          <form onSubmit={(ev)=>handleSubmit(ev,roomOption,roomCode,formName)}>
            <div className={classes.form}>
              <TextField label = 'Enter Username' name="username" type="text" />
              <TextField label = 'Enter Password' name="password" type="password" />
              <Button className = {classes.button} color="primary" variant="contained" type= 'submit' value={formName}>{formName==='signup'?'Sign Up':'Login'}</Button>
              <p>{formName==='signup'?'Already have an account?':'Dont have an account?'} <button value={formName==='login'?'signup':'login'} onClick={selectFormName}>{formName==='signup'?'Login':'Register'}</button></p>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        ):null}
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
    handleSubmit(evt,roomOption,roomCode,formName) {
      evt.preventDefault()
      // console.log(roomOption)
      // console.log(roomCode)
      // formName = evt.target.name
      // console.log('FormName:',formName)
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
