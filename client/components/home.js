import React, {useState, useCallback} from "react";
import { connect } from "react-redux";

export const Home = (props) => {
  return (
    <div>
      <h1>Queue</h1>
    </div>
  )
}

export default connect(null,null)(Home);