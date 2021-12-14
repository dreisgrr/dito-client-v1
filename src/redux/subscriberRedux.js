import { createSlice } from "@reduxjs/toolkit";

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    currentUser: null,
    isFetching: "",
    error: false,
    errorMessage: "",
    errorPw: false,
    errorMessagePw: "",
    errorAddress: false,
    errorMessageAddress: "",
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
    resetAccountPageErrorsRedux: (state) => {
      state.error = false;
      state.errorMessage = "";
      state.errorAddress = false;
      state.errorMessageAddress = "";
      state.errorPw = false;
      state.errorMessagePw = "";
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
    updatePersonalInfoRedux: (state, action) => {
      state.currentUser.user.name = action.payload.name;
      state.currentUser.user.email = action.payload.email;
      state.error = true;
      state.errorMessage = "Perosnal information successfully changed";
    },
    updatePersonalPwRedux: (state, action) => {
      state.currentUser.user.password = action.payload.password;
      state.errorPw = true;
      state.errorMessagePw = "Password successfuly changed";
    },
    updatePersonalAddressRedux: (state, action) => {
      state.currentUser.user.address = action.payload.address;
      state.errorAddress = true;
      state.errorMessageAddress = "Address successfuly changed";
    },
    updateUserInfo: (state, action) => {
      state.raffleEntry = action.payload;
      state.error = true;
      state.errorMessage = "Account information updated";
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
    resetPwErrorsRedux: (state) => {
      state.errorPw = false;
      state.errorMessagePw = "";
    },
    setErrorMessage: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },
    showErrorMessagePwRedux: (state, action) => {
      state.errorPw = true;
      state.errorMessagePw = action.payload;
    },
    showErrorMessageAddressRedux: (state, action) => {
      state.errorAddress = true;
      state.errorMessageAddress = action.payload;
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
  updatePersonalInfoRedux,
  showErrorMessagePwRedux,
  updatePersonalPwRedux,
  resetPwErrorsRedux,
  updatePersonalAddressRedux,
  showErrorMessageAddressRedux,
  resetAccountPageErrorsRedux,
} = subscriberSlice.actions;
export default subscriberSlice.reducer;
