import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICounterSlice {
  email: string;
  password: string;
}

const initialState: ICounterSlice = {
  email: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<ICounterSlice>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    resetLogin: (state) => {
      state.email = "";
      state.password = "";
    },
  },
});
export const { setLogin,resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
