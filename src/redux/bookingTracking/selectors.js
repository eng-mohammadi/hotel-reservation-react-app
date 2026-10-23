import { createSelector } from "reselect";

const selectBooking = (state) => state.bookingTracking;

export const selectFilteredRoomsByDate = createSelector(
  [selectBooking],
  (booking) => booking.filteredRoomsByDate || []
);

export const selectFilteredFoodsByDate = createSelector(
  [selectBooking],
  (booking) => booking.filteredFoodsByDate || []
);
