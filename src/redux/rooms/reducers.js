import { FILTER_ROOMS, SET_ROOMS } from "./ActionTypes";

const initialRoomsState = {
  rooms: [],
  filteredRooms: [],
};

export const roomsReducer = (state = initialRoomsState, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        filteredRooms: action.payload,
      };
    case FILTER_ROOMS: {
      const {
        filterName = "",
        filterImagesEnabled = false,
        filterCapacity,
        filterPricePerNight,
        filterAmenitiesList = [],
      } = action.payload;

      let filtered = [...state.rooms];

      if (filterName.trim()) {
        filtered = filtered.filter((room) =>
          room.name.toLowerCase().includes(filterName.toLowerCase())
        );
      }

      if (filterImagesEnabled) {
        filtered = filtered.filter(
          (room) => Array.isArray(room.images) && room.images.length > 0
        );
      }

      if (filterPricePerNight != null && filterPricePerNight !== "") {
        filtered = filtered.filter(
          (room) => room.pricePerNight <= Number(filterPricePerNight)
        );
      }

      if (filterCapacity != null && filterCapacity !== "") {
        filtered = filtered.filter(
          (room) => room.capacity >= Number(filterCapacity)
        );
      }

      if (Array.isArray(filterAmenitiesList) && filterAmenitiesList.length) {
        filtered = filtered.filter((room) =>
          room.amenities.some((amenity) =>
            filterAmenitiesList.includes(amenity)
          )
        );
      }

      return { ...state, filteredRooms: filtered };
    }

    default:
      return state;
  }
};
