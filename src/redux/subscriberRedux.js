import { createSlice } from "@reduxjs/toolkit";

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    currentUser: null,
    isFetching: "",
    error: false,
    errorMessage: "",
    isRegistered: false,
    isNewUser: false,
    isAuthenticated: false,
    raffleEntry: false,
    tempNumber: "",
    tempUser: null,
    smsOtp: false,
    otpMaxRequest: 3,
    tempPw: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.errorMessage = "";
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.isRegistered = true;
      state.tempUser = action.payload;
      state.isAuthenticated = false;
    },
    loginSuccessPW: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload;
      state.tempUser = null;
      state.isNewUser = false;
    },
    resetLoginFormError: (state) => {
      state.error = false;
      state.errorMessage = "";
    },
    verifyOTPstart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.errorMessage = "";
    },
    verifyOTPCreated: (state, action) => {
      state.isFetching = false;
      state.smsOtp = action.payload.valid;
    },
    verifyOTPfRequestError: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    verifyOTPVerifySuccess: (state, action) => {
      state.currentUser = state.tempUser;
      state.isAuthenticated = true;
      state.mobileNumber = action.payload;
      state.tempUser = null;
      state.errorMessage = "";
      state.error = false;
      state.otp = "";
      state.isFetching = false;
      state.isRegistered = false;
      state.isNewUser = false;
      state.smsOtp = false;
    },
    verifyOTPVerifyFail: (state) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = "Invalid OTP";
    },
    notRegisteredsuccess: (state, action) => {
      state.isFetching = false;
      state.isNewUser = true;
      state.tempNumber = "";
    },
    isRegistered: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isNewUser = false;
      state.errorMessage = "Already registered!";
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.isRegistered = false;
      state.isNewUser = false;
      state.isAuthenticated = false;
      state.mobileNumber = "";
      state.tempUser = null;
      state.smsOtp = false;
      state.otp = "";
      state.currentUser = action.payload;
    },
    registerPWSuccess: (state, action) => {
      state.isFetching = false;
      state.isNewUser = true;
      state.tempUser = action.payload;
      state.error = false;
      state.errorMessage = "";
    },
    updateUserInfo: (state, action) => {
      state.raffleEntry = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginSuccessPW,
  loginFailure,
  resetLoginFormError,
  verifyOTPstart,
  verifyOTPCreated,
  verifyOTPfRequestError,
  verifyOTPVerifySuccess,
  verifyOTPVerifyFail,
  notRegisteredsuccess,
  isRegistered,
  registerSuccess,
  updateUserInfo,
  registerPWSuccess,
} = subscriberSlice.actions;
export default subscriberSlice.reducer;
