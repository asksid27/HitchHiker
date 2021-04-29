import { combineReducers } from "redux";
import { states } from "./states";

const Reducers = combineReducers({
  states: states,
});

export default Reducers;
