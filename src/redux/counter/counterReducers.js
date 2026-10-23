import {
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  CONSTANT_COUNTER,
  RESET_COUNTER,
} from "./ActionTypes";

const initialState = {
  number: 0,
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_COUNTER:
      return { ...state, number: state.number + 1 };
    case DECREASE_COUNTER:
      return { ...state, number: state.number > 0 ? state.number - 1 : 0 };
    case CONSTANT_COUNTER:
      return { ...state, number: state.number };
    case RESET_COUNTER:
      return { ...state, number: 0 };
    default:
      return state;
  }
};
