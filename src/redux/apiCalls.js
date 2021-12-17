import {
  loginFailure,
  loginStart,
  loginSuccess,
  loginSuccessPW,
  resetLoginFormError,
  verifyOTPstart,
  verifyOTPCreated,
  verifyOTPfRequestError,
  verifyOTPVerifySuccess,
  notRegisteredsuccess,
  isRegistered,
  registerSuccess,
  updateUserInfo,
  registerPWSuccess,
  invalidEmailFormError,
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
} from "./subscriberRedux";
import { publicRequest, requestOTP, semaOTP } from "../requestMethods";

export const subscriberLogin = async (dispatch, subscriber) => {
  dispatch(loginStart());
  try {
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

export const subscriberLoginPW = async (dispatch, subscriber) => {
  console.log("apiCall - subscriberLoginPW");
  dispatch(loginStart());
  const { mobileNumber, password } = subscriber;
  try {
    const res = await publicRequest.post("/auth/subscriber/login", subscriber);
    const { data } = res;
    console.log(data);
    dispatch(loginSuccessPW(data));
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
export const sunscriberNotExistsPW = async (dispatch, subscriber) => {
  console.log("apiCall - sunscriberNotExistsPW");
  console.log(JSON.stringify(subscriber));
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(
      "/auth/subscriber/registerPW",
      subscriber
    );
    const { config } = res;
    const newUser = config.data;
    console.log(newUser);
    dispatch(registerPWSuccess(JSON.parse(newUser)));
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data;
      dispatch(loginFailure(errorMessage));
    }
  }
};

export const resetLoginError = (dispatch) => {
  dispatch(resetLoginFormError());
};
export const resetPwErrors = (dispatch) => {
  dispatch(resetPwErrorsRedux());
};

export const resetAccountPageErrors = (dispatch) => {
  //dispatch(resetAccountPageErrorsRedux());
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
  console.log("apiCall - subscriberRegister");
  const { mobileNumber, password, name, email, address, consent } = subscriber;
  console.log(mobileNumber);
  console.log(password);
  console.log(email);
  console.log(name);
  console.log(address);
  console.log(consent);
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
export const loadUserPointsHistory = async (dispatch, mobileNumber) => {
  try {
    console.log("Load user points history");
    const res = await publicRequest.post(
      "/info/subscriber/pointsHistory",
      mobileNumber
    );
    const { data } = res;
    dispatch(getPointsHistory(data));
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data;
    }
  }
};

export const updatePersonalInfo = async (dispatch, subscriber) => {
  try {
    console.log("Update Personal Information");
    const res = await publicRequest.post(
      "/info/subscriber/updatePersonalInfo",
      subscriber
    );

    const { data } = res;
    console.log(res);
    dispatch(updatePersonalInfoRedux(subscriber));
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data;
    }
  }
};

export const updatePersonalPw = async (dispatch, subscriber) => {
  try {
    console.log("Update Personal Password");
    const res = await publicRequest.post(
      "/info/subscriber/updatePersonalPw",
      subscriber
    );

    const { data } = res;
    console.log(res);
    dispatch(updatePersonalPwRedux(subscriber));
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data;
    }
  }
};

export const updatePersonalAddress = async (dispatch, subscriber) => {
  try {
    console.log("Update Personal Address");
    const res = await publicRequest.post(
      "/info/subscriber/updatePersonalAddress",
      subscriber
    );

    const { data } = res;
    console.log(res);
    dispatch(updatePersonalAddressRedux(subscriber));
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data;
    }
  }
};

export const sendVerification = async (dispatch, subscriber) => {
  try {
    console.log("Send Email Verification");
    const res = await publicRequest.post(
      "/auth/subscriber/sendVerification",
      subscriber
    );

    const { data } = res;
    console.log(res);
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

export const invalidEmailError = (dispatch) => {
  dispatch(invalidEmailFormError());
};
export const afterSplashScreen = async (dispatch) => {
  dispatch(clearWelcomeState());
};
export const showErrorMessage = async (dispatch, err) => {
  dispatch(setErrorMessage(err));
};
export const showErrorMessagePw = async (dispatch, err) => {
  dispatch(showErrorMessagePwRedux(err));
};
export const showErrorMessageAddress = async (dispatch, err) => {
  dispatch(showErrorMessageAddressRedux(err));
};
export const clearRegistrationAuth = (dispatch) => {
  dispatch(clearRegAuth());
};
