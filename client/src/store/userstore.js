import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
  name: "user",
  initialState: {
    currentuser: null,
    loading: false,
    error: false,
  },
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.currentuser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signinfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateuserStart: (state) => {
      state.loading = true;
    },
    updateUsersuccess: (state, action) => {
      state.currentuser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateuserfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteuserStart: (state) => {
      state.loading = true;
    },
    deleteUsersuccess: (state) => {
      state.currentuser = null;
      state.loading = false;
      state.error = false;
    },
    deleteuserfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signout: (state) => {
      state.currentuser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinfailure,
  updateuserStart,
  updateUsersuccess,
  updateuserfailure,
  deleteuserStart,
  deleteUsersuccess,
  deleteuserfailure,
  signout,
} = Userslice.actions;

export default Userslice.reducer;
