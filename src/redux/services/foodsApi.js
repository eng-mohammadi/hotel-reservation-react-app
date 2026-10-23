import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodsApi = createApi({
  reducerPath: "foodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3032" }),
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: () => "foods",
      providesTags: ["Foods"],
    }),
  }),
});

export const { useGetFoodsQuery } = foodsApi;
