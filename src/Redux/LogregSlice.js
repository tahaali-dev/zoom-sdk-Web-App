import { createSlice } from "@reduxjs/toolkit";
//Imports--------------------------

const Userslice = createSlice({
  name: "Userslice",
  initialState: {
    formData: null,
  },
  reducers: {
    SetfromData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { SetfromData } = Userslice.actions;
export const Userreducer = Userslice.reducer;
