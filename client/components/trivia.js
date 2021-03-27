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
  // const [data,setData] = useState([])
  const [question,setQuestion] = useState({})
  const [score,setScore] = useState(0)

  useEffect(()=>{
    axios.get('https://opentdb.com/api.php?amount=50')
    .then((response)=>{
      console.log(`data`,response.data.results)
      console.log(typeof response.data.results)
      const num = Math.floor(Math.random()*50)
      setQuestion(response.data.results[num])
    })
  },[])

  const handleNext = () => {
    axios.get('https://opentdb.com/api.php?amount=50')
    .then((response)=>{
      console.log(`data`,response.data.results)
      console.log(typeof response.data.results)
      const num = Math.floor(Math.random()*50)
      setQuestion(response.data.results[num])
    })
  }

console.log(question)
  return (
    <div>
      <h2 style={{color: "white"}}>Answer 5 Questions Correctly in a Row to Win Veto Power</h2>
      
      <h2 style={{color: "white"}}>Score: </h2>
      <div id="trivia-master">

      <div className = "activeTrivia">
        <h2 style={{color: "white"}}>
          {question.question}
        </h2>
        {
          question.type === 'multiple' ?
          (
            <div>
              <p style={{color: "white"}}>{question.correct_answer}</p>
              <p style={{color: "white"}}>{question.incorrect_answers[0]}</p>
              <p style={{color: "white"}}>{question.incorrect_answers[1]}</p>
              <p style={{color: "white"}}>{question.incorrect_answers[2]}</p>
            </div>
          )
          :
          (
            <div>
              <p style={{color: "white"}}>true</p>
              <p style={{color: "white"}}>false</p>
            </div>
          )
        }
        <StyledButton onClick={()=>handleNext()}>Next</StyledButton>
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
  }
};

export default connect(mapState,mapDispatch)(Trivia);
