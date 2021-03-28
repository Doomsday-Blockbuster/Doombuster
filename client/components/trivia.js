//https://opentdb.com/api.php?amount=50

import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles'
import {Button} from '@material-ui/core';
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
  const [answerValue, setAnswerValue] = useState('')

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

  const handleRadioChange = () => {

  }

console.log(question)
  return (
    <div>
      <h2 style={{color: "white"}}>Answer 5 Questions Correctly in a Row to Win Veto Power</h2>
      
      <h2 style={{color: "white"}}>Score: </h2>
      <div id="trivia-master">

      <div className = "activeTrivia">
        <form>
          <h2>
            {question.question}
          </h2>
          {
            question.type === 'multiple' ?
            (
              <div>
                <div className="formgroup">
                  <input type='radio' id="choice1" name="anss" value={question.correct_answer} />
                  <label for="choice1">{question.correct_answer}</label>
                </div>
                <div className="formgroup">
                  <input type='radio' id="choice2" name="anss" value={question.incorrect_answers[0]} />
                  <label>{question.incorrect_answers[0]}</label>
                </div>
                <div className="formgroup">
                  <input type='radio' id="choice3" name="anss" value={question.incorrect_answers[1]} />
                  <label>{question.incorrect_answers[1]}</label>
                </div>
                <div className="formgroup">
                  <input type='radio' id="choice4" name="anss" value={question.incorrect_answers[2]} />
                  <label>{question.incorrect_answers[2]}</label>
                </div>
              </div>
            )
            :
            (
              <div>
                <div className="formgroup">
                  <input type='radio' id="true" name="ans" value="true" />
                  <label for="true">True</label>
                </div>
                <div className="formgroup">
                  <input type='radio' id="false" name="ans" value="false" />
                  <label for="false">False</label>
                </div>

                
              </div>
            )
          }
        </form>
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
