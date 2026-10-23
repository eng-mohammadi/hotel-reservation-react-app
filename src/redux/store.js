import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { roomsApi } from "./services/roomsApi";
import { foodsApi } from "./services/foodsApi";
import { foodReservationApi } from "./services/foodReservationApi";
import { roomsReducer } from "./rooms/reducers";
import { foodsReducer } from "./foods/reducers";
import { bookingTrackingReducer } from "./bookingTracking/reducers";
import { accountingApi } from "./services/accountingApi";
import { roomReservationApi } from "./services/roomReservationApi";
import { counterReducer } from "./counter/counterReducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["counter"],
};

const rootReducer = combineReducers({
  [roomsApi.reducerPath]: roomsApi.reducer,
  [foodsApi.reducerPath]: foodsApi.reducer,
  [foodReservationApi.reducerPath]: foodReservationApi.reducer,
  [accountingApi.reducerPath]: accountingApi.reducer,
  [roomReservationApi.reducerPath]: roomReservationApi.reducer,
  bookingTracking: bookingTrackingReducer,
  rooms: roomsReducer,
  foods: foodsReducer,
  counter: counterReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      roomsApi.middleware,
      foodsApi.middleware,
      foodReservationApi.middleware,
      accountingApi.middleware,
      roomReservationApi.middleware
    ),
});

export const persistor = persistStore(store);
export default store;
