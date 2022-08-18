import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import AppReducer from "./AppReducer";

const RootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    AppReducer,
  });
export default RootReducer;
