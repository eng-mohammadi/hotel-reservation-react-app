import { FILTER_FOODS, SET_FOODS } from "./ActionTypes";

export const filterFoods = (filters) => {
  return {
    type: FILTER_FOODS,
    payload: { ...filters },
  };
};

export const setFoods = (foods) => {
  return {
    type: SET_FOODS,
    payload: foods,
  };
};
