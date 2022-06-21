import { combineReducers } from "redux";

import { roomReducer } from "./room/room";

const reducer = combineReducers({
  room: roomReducer,
});

export default reducer;
