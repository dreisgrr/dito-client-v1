import {
  loginFailure,
  loginStart,
  loginSuccess,
  resetLoginFormError,
  verifyOTPstart,
  verifyOTPCreated,
  verifyOTPfRequestError,
  verifyOTPVerifySuccess,
  notRegisteredsuccess,
  isRegistered,
  registerSuccess,
  updateUserInfo,
} from "./subscriberRedux";
import { publicRequest, requestOTP, sendOTP } from "../requestMethods";

export const subscriberLogin = async (dispatch, subscriber) => {
  dispatch(loginStart());
  try {
    console.log("login: " + subscriber);
    const res = await publicRequest.post("/auth/subscriber/login", subscriber);
    const { data } = res;
    console.log(data);
    dispatch(loginSuccess(data));
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data;
      dispatch(loginFailure(errorMessage));
    }
  }
};

export const sunscriberNotExists = async (dispatch, subscriber) => {
  dispatch(loginStart());
  try {
    console.log("is Not Existing: " + subscriber);
    const res = await publicRequest.post(
      "/auth/subscriber/ifNotExists",
      subscriber
    );
    //const { data } = res;
    dispatch(notRegisteredsuccess(res));
    console.log("res" + res);
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data;
      dispatch(isRegistered(errorMessage));
    }
  }
};

export const resetLoginError = (dispatch) => {
  console.log("Reset Subscriber Login Form error message");
  dispatch(resetLoginFormError());
};

export const subscriberGenerateOTP = async (dispatch, phone) => {
  console.log("Request for OTP sent");
  console.log("phone: " + { phone });
  dispatch(verifyOTPstart());
  try {
    console.log("API call - generate OTP", phone);
    const res = await requestOTP.post("", phone);
    const { data } = res;
    console.log(data);
    dispatch(verifyOTPCreated(data));
  } catch (err) {
    if (err) {
      const errorMessage = err.errorMessage;
      dispatch(verifyOTPfRequestError(err));
    }
  }
};

export const sunscriberOTPVerified = (dispatch, mobileNumber) => {
  dispatch(verifyOTPVerifySuccess(mobileNumber));
};

export const subscriberRegister = async (dispatch, subscriber) => {
  console.log("subscriberRegister");
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "/auth/subscriber/register",
      subscriber
    );
    const { data } = res;
    const user = data;
    console.log(user);
    dispatch(registerSuccess(user));
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data;
      dispatch(loginFailure(errorMessage));
    }
  }
};
export const loadUserPoints = async (dispatch, mobileNumber) => {
  try {
    console.log("Load user points");
    const res = await publicRequest.post(
      "/info/subscriber/totalEntries",
      mobileNumber
    );
    const { data } = res;
    console.log(data);
    dispatch(updateUserInfo(data));
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data;
    }
  }
};
export const sendSemaOTP = async (dispatch, params) => {
  try {
    const res = await sendOTP
      .post("", null, {
        params: { params },
      })
      .then((res) => dispatch(verifyOTPCreated(res)));
  } catch (err) {}
};
