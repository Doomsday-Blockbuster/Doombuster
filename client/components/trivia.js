//https://opentdb.com/api.php?amount=50

import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles'

import { Radio, RadioGroup, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';

import {Button} from '@material-ui/core';
import axios from 'axios'

const StyledButton = withStyles({
  root: {
    margin:'1rem',
    width:'100px',
    backgroundColor:'#34ebe5',
    color:'black',
    '&:hover': {
      backgroundColor: '#fe019a'
    }
  }
})(Button)

const StyledRadio = withStyles({
  root: {
    margin:'0',
    color:'white',
    padding:'0'
  }
})(Radio)


export const Trivia = (props) => {
  // const [data,setData] = useState([])
  const [question,setQuestion] = useState({})
  const [score,setScore] = useState(0)
  const [radioValue, setRadioValue] = useState('')
  const [correct, setCorrect] = useState(false)

  function parseHtmlEnteties(str) {
    return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
        var num = parseInt(numStr, 10); // read num as normal number
        return String.fromCharCode(num);
    });
}

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
    console.log(`selection`,radioValue.response)
    console.log(typeof question.correct_answer)
    console.log(`correct`,question.correct_answer)
    console.log(typeof radioValue.response)
    console.log(question.correct_answer === radioValue.response)

    if(question.correct_answer === radioValue.response){
      setScore(score=>score+1)
      console.log(`score`,score)
    }else{
      setScore(0)
    }

    if(score >= 5){
      
    }
    axios.get('https://opentdb.com/api.php?amount=50')
    .then((response)=>{
      console.log(`data`,response.data.results)
      console.log(typeof response.data.results)
      const num = Math.floor(Math.random()*50)
      setQuestion(response.data.results[num])
    })
  }

  const handleRadioChange = (ev) => {
      const response = ev.target.value
      setRadioValue({response})
  }

console.log(question)

  return (
    <div>
      <h2 style={{color: "white"}}>Answer 5 Questions Correctly in a Row to Win Veto Power</h2>
      
      <h2 style={{color: "white"}}>Score: {score}</h2>
      <div id="trivia-master">

      <div className = "activeTrivia">
        <form>
          <h2>
            {question.question}
          </h2>
          {
            question.type === 'multiple' ?
            ( 
              <FormControl component="fieldset">
                <RadioGroup column onChange={handleRadioChange} value={radioValue} defaultValue=''>
                  <FormControlLabel value={question.correct_answer} control={<StyledRadio />} label={question.correct_answer} />
                  <FormControlLabel value={question.incorrect_answers[0]} control={<StyledRadio />} label={question.incorrect_answers[0]} />
                  <FormControlLabel value={question.incorrect_answers[1]} control={<StyledRadio />} label={question.incorrect_answers[1]} />
                  <FormControlLabel value={question.incorrect_answers[2]} control={<StyledRadio />} label={question.incorrect_answers[2]} />
                </RadioGroup>
              </FormControl>
            )
            :
            (
              <FormControl component="fieldset">
              <RadioGroup column onChange={handleRadioChange} defaultValue={radioValue}>
                <FormControlLabel value="True" control={<Radio />} label="True" />
                <FormControlLabel value="False" control={<Radio />} label="False" />
              </RadioGroup>
            </FormControl>
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
