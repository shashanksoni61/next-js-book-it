import axiosMain from "@config/api";

import * as AL from "store/actionLabels";

export const clearRoomsErrors = () => async (dispatch) => {
  dispatch({
    type: AL.CLEAR_ROOM_ERROR,
  });
};

export const getAllRooms = () => async (dispatch) => {
  try {
    dispatch({
      type: AL.ALL_ROOMS_START,
    });
    const response = await axiosMain.get("/rooms");

    dispatch({
      type: AL.ALL_ROOMS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: AL.ALL_ROOMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getRoomDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: AL.GET_ROOM_DETAIL_START,
    });

    const response = await axiosMain.get(`/rooms/${id}`);

    dispatch({
      type: AL.GET_ROOM_DETAIL_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: AL.GET_ROOM_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};
