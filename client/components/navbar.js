import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

class Navbar extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const {handleClick, isLoggedIn, room, otherProps} = this.props
    return(
      <div>
        <nav>
          {isLoggedIn ? (
            <div>
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to={`/home/${room}`}>Home</Link>
                <Link to={`/select/${room}`}>Choose a Song</Link>
                <a href="#" onClick={()=>handleClick(room)}>
                  Logout
                </a>
              </div>
              <hr />
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              {/* <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link> */}
            </div>
          )}
        </nav>
  </div>



    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state,otherProps) => {
  return {
    isLoggedIn: !!state.auth.id,
    room: window.location.pathname.slice(-1)*1,
    otherProps
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(room) {
      dispatch(logout(room))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
