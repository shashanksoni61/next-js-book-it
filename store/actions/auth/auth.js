import axiosMain from "@config/api";
import * as AL from "../../actionLabels";

export const clearAuthError = () => async (dispatch) => {
  dispatch({
    type: AL.CLEAR_AUTH_ERROR,
  });
};

export const userRegisterStart = () => async (dispatch) => {
  dispatch({
    type: AL.USER_REGISTER_START,
  });
};

export const userRegisterSuccess = (payload) => async (dispatch) => {
  dispatch({
    type: AL.USER_REGISTER_SUCCESS,
    payload,
  });
};

export const userRegisterFail = (payload) => async (dispatch) => {
  dispatch({
    type: AL.USER_REGISTER_FAIL,
    payload,
  });
};

export const userRegisterAction = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: AL.USER_REGISTER_START,
    });

    const res = await axiosMain.post("auth/register", userData);
    dispatch({
      type: AL.USER_REGISTER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: AL.USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
