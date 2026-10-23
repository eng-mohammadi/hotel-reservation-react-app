import { FILTER_ROOMS, SET_ROOMS } from "./ActionTypes";

export const filterRooms = (filters) => ({
  type: FILTER_ROOMS,
  payload: { ...filters },
});

export const setRooms = (rooms) => ({
  type: SET_ROOMS,
  payload: rooms,
});
