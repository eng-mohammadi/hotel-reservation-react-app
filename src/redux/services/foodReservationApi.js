import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodReservationApi = createApi({
  reducerPath: "foodReservationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  endpoints: (builder) => ({
    getFoodReservation: builder.query({
      query: () => "foodReservation",
      providesTags: ["FoodReservation"],
    }),
    addFoodReservation: builder.mutation({
      query: (items) => ({
        url: "foodReservation",
        method: "POST",
        body: items,
      }),
      invalidatesTags: ["FoodReservation"],
    }),
    editFoodReservation: builder.mutation({
      query: ({ id, ...updatedFoodReservation }) => ({
        url: `foodReservation/${id}`,
        method: "PATCH",
        body: updatedFoodReservation,
      }),
      invalidatesTags: ["FoodReservation"],
    }),
    deleteFoodReservation: builder.mutation({
      query: (id) => ({
        url: `foodReservation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FoodReservation"],
    }),
  }),
});

export const {
  useGetFoodReservationQuery,
  useAddFoodReservationMutation,
  useEditFoodReservationMutation,
  useDeleteFoodReservationMutation,
} = foodReservationApi;
