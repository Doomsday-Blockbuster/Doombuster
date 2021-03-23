import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import songs from "./songs";
import queue from "./queue";
import voteError from "./vote";
import roomdetail from "./room";

const reducer = combineReducers({ auth, songs, queue, voteError, roomdetail });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);
export default store;
export * from "./auth";
export * from "./songs";
export * from "./queue";
export * from "./vote";
export * from "./room";
