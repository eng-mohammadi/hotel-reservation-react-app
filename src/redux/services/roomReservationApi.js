import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomReservationApi = createApi({
  reducerPath: "roomReservation",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  endpoints: (builder) => ({
    getRoomReservation: builder.query({
      query: () => "roomReservation",
      providesTags: ["RoomReservation"],
    }),
    addRoomReservation: builder.mutation({
      query: (newRoomReservation) => ({
        url: "roomReservation",
        method: "POST",
        body: newRoomReservation,
      }),
      invalidatesTags: ["RoomReservation"],
    }),
    editRoomReservation: builder.mutation({
      query: ({ id, ...updatedRoomReservation }) => ({
        url: `roomReservation/${id}`,
        method: "PATCH",
        body: updatedRoomReservation,
      }),
      invalidatesTags: ["RoomReservation"],
    }),
    deleteRoomReservation: builder.mutation({
      query: (id) => ({
        url: `roomReservation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoomReservation"],
    }),
  }),
});

export const {
  useGetRoomReservationQuery,
  useAddRoomReservationMutation,
  useEditRoomReservationMutation,
  useDeleteRoomReservationMutation,
} = roomReservationApi;
