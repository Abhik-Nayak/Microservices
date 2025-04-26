import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("User")) || null,
  token: localStorage.getItem("token") || null,
};

const localStorageSlice = createSlice({
  name: "localStorageData",
  initialState,
  reducers: {
    updateLocalStorageData: (state) => {
      state.user = JSON.parse(localStorage.getItem("user"));
      state.token = localStorage.getItem("token");
    },
    clearLocalStorageData: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {updateLocalStorageData,clearLocalStorageData} = localStorageSlice;
export default localStorageSlice.reducer;
