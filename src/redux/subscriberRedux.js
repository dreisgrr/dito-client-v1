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
    pointsHistory: null,
    tempNumber: "",
    tempUser: null,
    smsOtp: false,
    otpMaxRequest: 3,
    tempPw: "",
    regFormError: false,
    regFormMessage: "",
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
      state.mobileNumber = "";
      state.tempUser = null;
      state.smsOtp = false;
      state.otp = "";
      state.currentUser = action.payload;
    },
    clearWelcomeState: (state, action) => {
      state.isNewUser = false;
      state.isAuthenticated = false;
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
    getPointsHistory: (state, action) => {
      state.pointsHistory = action.payload;
    },
    invalidEmailFormError: (state) => {
      state.regFormError = true;
      state.regFormMessage = "Invalid email address";
    },
    resetRegFormErrors: (state) => {
      state.regFormError = false;
      state.regFormMessage = "";
    },
    setErrorMessage: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },
    clearRegAuth: (state) => {
      state.currentUser = null;
      state.isFetching = "";
      state.errorMessage = "";
      state.isRegistered = false;
      state.isNewUser = false;
      state.isAuthenticated = false;
      state.raffleEntry = false;
      state.pointsHistory = null;
      state.tempNumber = "";
      state.tempUser = null;
      state.tempPw = "";
      state.regFormError = false;
      state.regFormMessage = "";
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
  invalidEmailFormError,
  resetRegFormErrors,
  clearWelcomeState,
  setErrorMessage,
  getPointsHistory,
  clearRegAuth,
} = subscriberSlice.actions;
export default subscriberSlice.reducer;
