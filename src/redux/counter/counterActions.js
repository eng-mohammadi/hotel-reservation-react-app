import {
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  CONSTANT_COUNTER,
  RESET_COUNTER,
} from "./ActionTypes";

export const increaseCounter = () => {
  return {
    type: INCREASE_COUNTER,
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREASE_COUNTER,
  };
};

export const constantCounter = () => {
  return {
    type: CONSTANT_COUNTER,
  };
};

export const resetCounter = () => {
  return {
    type: RESET_COUNTER,
  };
};
