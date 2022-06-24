import * as actionLabels from "../../actionLabels";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  errorMsg: "",
  successMsg: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionLabels.USER_REGISTER_START:
      return { ...state, isLoading: true, isAuthenticated: false };

    case actionLabels.USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        successMsg: "User Created Successfully, Login Now",
      };

    case actionLabels.USER_REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        errorMsg: action.payload,
        successMsg: "",
      };

    case actionLabels.CLEAR_AUTH_ERROR:
      return {
        ...state,
        errorMsg: "",
        successMsg: "",
      };

    case actionLabels.CLEAR_USER_STATE: {
      return { ...state, user: null };
    }
    default:
      return state;
  }
};
