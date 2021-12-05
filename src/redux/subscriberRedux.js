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
    mobileNumber: "",
    tempUser: null,
    smsOtp: "",
    otpMaxRequest: 3,
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
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload;
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
      const { otp } = action.payload;
      state.isFetching = false;
      state.smsOtp = otp;
    },
    verifyOTPfRequestError: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    verifyOTPVerifySuccess: (state, action) => {
      state.currentUser = state.tempUser;
      state.isAuthenticated = true;
      state.mobileNumber = action.payload.mobileNumber;
      state.tempUser = null;
      state.errorMessage = "";
      state.error = false;
      state.otp = "";
      state.isFetching = false;
      state.isRegistered = false;
      state.isNewUser = false;
      state.smsOtp = "";
    },
    verifyOTPVerifyFail: (state) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = "Invalid OTP";
    },
    notRegisteredsuccess: (state, action) => {
      console.log("test");
      state.isFetching = false;
      state.isNewUser = true;
    },
    isRegistered: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isNewUser = false;
      state.errorMessage = "Already registered!";
    },
    registerSuccess: (state, action) => {
      console.log("register succcess");
      state.isFetching = false;
      state.isRegistered = false;
      state.isNewUser = false;
      state.isAuthenticated = false;
      state.mobileNumber = "";
      state.tempUser = null;
      state.smsOtp = "";
      state.otp = "";
      state.currentUser = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.raffleEntry = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
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
} = subscriberSlice.actions;
export default subscriberSlice.reducer;
