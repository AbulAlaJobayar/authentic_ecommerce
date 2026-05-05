
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login/loginSlice";
import paramsReducer from "./features/params/paramSlice"
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    loginInfo: loginReducer,
    paramsInfo:paramsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
