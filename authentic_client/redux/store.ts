import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login/loginSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    loginInfo: loginReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
