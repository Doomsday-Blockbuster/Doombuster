//https://opentdb.com/api.php?amount=50

import React, {useState} from "react";
import { connect } from "react-redux";

export const Trivia = (props) => {
  const [q,setQ] = useState({})




  return (
    <div>
      <h2 style={{color: "white"}}>Gain VETO power for one song by answering 5 Questions Correctly in a Row.</h2>
      <h2 style={{color: "white"}}>Score: </h2>
      <div id="trivia-master">

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
