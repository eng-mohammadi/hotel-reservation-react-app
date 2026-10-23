import {
  FILTER_ROOMS_BY_DATE,
  FILTER_FOODS_BY_DATE,
  SET_ROOMS,
  SET_FOODS,
} from "./ActionTypes";

export const filterRoomsByDate = ({ checkInDate, checkOutDate }) => {
  return {
    type: FILTER_ROOMS_BY_DATE,
    payload: { checkInDate, checkOutDate },
  };
};

export const setRooms = (rooms) => {
  return {
    type: SET_ROOMS,
    payload: rooms,
  };
};

export const filterFoodsByDate = ({ filterFoodDate }) => {
  return {
    type: FILTER_FOODS_BY_DATE,
    payload: { filterFoodDate },
  };
};

export const setFoods = (foods) => {
  return {
    type: SET_FOODS,
    payload: foods,
  };
};
