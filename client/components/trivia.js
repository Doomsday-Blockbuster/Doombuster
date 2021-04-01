//https://opentdb.com/api.php?amount=50

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {page} from '../store/page'
//import {updateWinner} from '../store/auth'

import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

import { Button } from "@material-ui/core";
import axios from "axios";

const StyledButton = withStyles({
  root: {
    margin: "1rem",
    width: "100px",
    backgroundColor: "#34ebe5",
    color: "black",
    "&:hover": {
      backgroundColor: "#fe019a",
    },
  },
})(Button);

const StyledRadio = withStyles({
  root: {
    margin: "0",
    color: "white",
    padding: "0",
  },
})(Radio);

export const Trivia = (props) => {
  // const [data,setData] = useState([])
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [radioValue, setRadioValue] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [open, setOpen] = useState(false);

  const { userId, username, room } = props;

  //   function parseHtmlEnteties(str) {
  //     return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
  //         var num = parseInt(numStr, 10); // read num as normal number
  //         return String.fromCharCode(num);
  //     });
  // }

  function convertHTML(str) {
    let regex = /&quot;|&amp;|&#039;|&lt;|&gt;|&eacute;/g;
    return str.replace(regex, function (match, numStr) {
      switch (match) {
        case "&quot;":
          return '"';
        case "&amp;":
          return "&";
        case "&#039;":
          return "'";
        case "&lt;":
          return "<";
        case "&gt;":
          return ">";
        case "&eacute;":
          return "é";
        default:
          return "";
      }
    });
  }

  // URL for just music trivia below
  //https://opentdb.com/api.php?amount=50&category=12&difficulty=easy&type=multiple
  useEffect(() => {
    props.setPage()
    axios
      .get(
        "https://opentdb.com/api.php?amount=50&category=12&difficulty=easy&type=multiple"
      )
      .then((response) => {
        console.log(`data`, response.data.results);
        const num = Math.floor(Math.random() * 50);
        const question = response.data.results[num];
        //console.log(`before`,question.question)
        //question.question = convertHTML(question.question)
        //setQuestion(response.data.results[num])
        setQuestion(question);
        //console.log(`after`,question.question)
      });
  }, []);

  const handleNext = () => {
    if (question.correct_answer === radioValue.response) {
      setScore((score) => score + 1);
    } else {
      handleLoserPop();
      setScore(0);
    }
    console.log(`score`, score);
    if (score >= 2) {
      setGameWon(true);
      axios.put(`/api/users/${room}`, { username, gameWon: true });
      setScore(0);
    }
    axios
      .get(
        "https://opentdb.com/api.php?amount=50&category=12&difficulty=easy&type=multiple"
      )
      .then((response) => {
        const num = Math.floor(Math.random() * 50);
        //console.log('******',response.data.results[num])
        setQuestion(response.data.results[num]);
      });
  };

  const handleRadioChange = (ev) => {
    const response = ev.target.value;
    setRadioValue({ response });
  };

  const renderFeedback = () => {
    switch (score) {
      case 0:
        return "";
      case 1:
        return "Correct";
      case 2:
        return "Correct Again";
      case 3:
        return "Don't Blow It";
      case 4:
        return "One More!";
      default:
        return "";
    }
  };

  const handleLoserPop = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (Object.keys(question).length !== 0) {
    question.question = convertHTML(question.question);
    question.correct_answer = convertHTML(question.correct_answer);
    question.incorrect_answers = question.incorrect_answers.map(
      (incorrect_answer) => {
        console.log(incorrect_answer);
        return convertHTML(incorrect_answer);
      }
    );
  }

  return (
    <div>
      <h2 id="trivia-instructions">Answer 5 in a Row to Veto a Song</h2>
      <div id="trivia-master">
        {gameWon ? (
          <div className="activeTrivia">
            <h2>You Won! You can veto one song. Veto wisely.</h2>
          </div>
        ) : (
          <div className="activeTrivia">
            <h2>{question.question}</h2>
            <div className="answerAndScore">
              <form>
                {question.type === "multiple" ? (
                  <FormControl component="fieldset">
                    <RadioGroup
                      onChange={handleRadioChange}
                      value={radioValue}
                      defaultValue=""
                    >
                      <FormControlLabel
                        value={question.correct_answer}
                        control={<StyledRadio />}
                        label={question.correct_answer}
                      />
                      <FormControlLabel
                        value={question.incorrect_answers[0]}
                        control={<StyledRadio />}
                        label={question.incorrect_answers[0]}
                      />
                      <FormControlLabel
                        value={question.incorrect_answers[1]}
                        control={<StyledRadio />}
                        label={question.incorrect_answers[1]}
                      />
                      <FormControlLabel
                        value={question.incorrect_answers[2]}
                        control={<StyledRadio />}
                        label={question.incorrect_answers[2]}
                      />
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <FormControl component="fieldset">
                    <RadioGroup
                      onChange={handleRadioChange}
                      defaultValue={radioValue}
                    >
                      <FormControlLabel
                        value="True"
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value="False"
                        control={<Radio />}
                        label="False"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              </form>
              <div id="score-div">
                <h2>SCORE</h2>
                <h2 id="score-board">{score}</h2>
                <h6 style={{ color: "#fe019a" }}>{renderFeedback()}</h6>
              </div>
            </div>
            <StyledButton onClick={() => handleNext()}>Next</StyledButton>
          </div>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="confirm-add-song"
          aria-describedby="confirm-add-song"
        >
          <DialogTitle id="error-repeat">Better luck next time!</DialogTitle>
        </Dialog>
      </div>
    </div>
  );
};

const mapState = (state, otherProps) => {
  return {
    userId: state.auth.id,
    username: state.auth.username,
    room: otherProps.match.params.id,
    page: state.page
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    updateWinner: (userId, bool) => dispatch(updateWinner(userId, bool)),
    setPage:()=>dispatch(page())
  };
};

export default connect(mapState, mapDispatch)(Trivia);
