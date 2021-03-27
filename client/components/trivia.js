//https://opentdb.com/api.php?amount=50

import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

const StyledButton = withStyles({
  root: {
    margin:'1rem',
    width:'100px',
    backgroundColor:'#34ebe5',
    color:'black'
  }
})(Button)


export const Trivia = (props) => {
  const [q,setQ] = useState({})
  const [score,setScore] = useState({})

  useEffect(()=>{
    const question = props.fetchQuestion
    console.log(question)
  },[])


  return (
    <div>
      <h2 style={{color: "white"}}>Answer 5 Questions Correctly in a Row to Win Veto Power</h2>
      
      <h2 style={{color: "white"}}>Score: </h2>
      <div id="trivia-master">

      <div className = "activeTrivia">
        <StyledButton>Next</StyledButton>
      </div>

      </div>


    </div>

  )
}

const mapState = (state,otherProps) => {
  return {

  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    fetchQuestion: async()=>await axios.get('https://opentdb.com/api.php?amount=50').results
  }
};

export default connect(mapState,mapDispatch)(Trivia);
