import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ParamState {
  id: string;
}

const initialState: ParamState = {
  id: "",
};

const paramSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    resetParams: (state) => {
      state.id = "";
    },
  },
});

export const { setParams, resetParams } = paramSlice.actions;
export default paramSlice.reducer;