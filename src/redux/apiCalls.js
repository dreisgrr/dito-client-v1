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
import { publicRequest, requestOTP, semaOTP } from "../requestMethods";

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
  console.log("params" + subscriber);
  dispatch(loginStart());
  try {
    console.log("is Not Existing: " + subscriber);
    const res = await publicRequest.post(
      "/auth/subscriber/ifNotExists",
      subscriber
    );
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
  dispatch(verifyOTPstart());
  try {
    console.log("API call - generate OTP", phone);
    //const res = await requestOTP.post("", phone);

    const res = await publicRequest.post("/auth/subscriber/otp/generate", {
      mobileNumber: phone,
    });

    console.log(res);
    dispatch(verifyOTPCreated(res));
  } catch (err) {
    if (err) {
      const errorMessage = err.errorMessage;
      dispatch(verifyOTPfRequestError(err));
    }
  }
};

export const subscriberVerifyOTP = async (dispatch, user) => {
  dispatch(verifyOTPstart());
  try {
    console.log(`API call - verify OTP: ${user}`);

    const res = await publicRequest.post("/auth/subscriber/otp/verify", {
      mobileNumber: user.mobileNumber,
      code: user.otp,
    });
    console.log(res.data);
    dispatch(verifyOTPCreated(res.data));
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
    const res = await semaOTP
      .post("", null, {
        params: { params },
      })
      .then((res) => dispatch(verifyOTPCreated(res)));
  } catch (err) {}
};
