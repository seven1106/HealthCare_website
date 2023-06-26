import actionTypes from "../actions/actionTypes";
const initialState = {
  genders: [],
  roles: [],
  positions: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
          copyState.genders = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;