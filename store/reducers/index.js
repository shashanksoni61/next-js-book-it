import { combineReducers } from "redux";

import { authReducer } from "./auth/auth";
import { roomReducer } from "./room/room";

const reducer = combineReducers({
  auth: authReducer,
  room: roomReducer,
});

export default reducer;
