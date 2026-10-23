import { createSelector } from "reselect";

export const getFilteredRooms = createSelector(
  [(state) => state.rooms.filteredRooms],
  (filteredRooms) => (filteredRooms ? [...filteredRooms] : [])
);

export const getFilteredRoomsCount = createSelector(
  [getFilteredRooms],
  (filteredRooms) => filteredRooms.length
);
