import * as actionLabels from "../../actionLabels";

const initialState = {
  isLoading: false,
  rooms: [],
  errorMsg: "",
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionLabels.ALL_ROOMS_START:
      return {
        ...state,
        isLoading: true,
        rooms: {
          list: [],
          totalRecords: 0,
        },
        errorMsg: "",
      };

    case actionLabels.ALL_ROOMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rooms: action.payload,
        errorMsg: "",
      };
    case actionLabels.ALL_ROOMS_FAIL:
      return {
        ...state,
        isLoading: false,
        rooms: {
          list: [],
          totalRecords: 0,
        },
        errorMsg: action.payload,
      };

    case actionLabels.CLEAR_ROOM_ERROR:
      return {
        ...state,
        errorMsg: "",
      };
    default:
      return state;
  }
};
