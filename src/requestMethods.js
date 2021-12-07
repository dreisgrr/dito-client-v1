import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const OTP_URL_REQUEST =
  "https://u7xnwkt996.execute-api.ap-southeast-1.amazonaws.com/DEV/generate";

const SEMAPHONE_OTP_KEY = "11b4d730c511892ea9af5991b2da8248";

const SEMAPHONE_ENDPOINT = "https://api.semaphore.co/api/v4/otp";

const TWILIO_ENDPOINT = "https://verify.twilio.com/v2/";
const TWILIO_ACC_ID = "ACf9e08bd70e810953eda95713df7c2ab1";
const TWILIO_AUTH_KEY = "2ca3439932cc178f3504b64c8f2385f8";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.subscriber;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  header: { "Content-Type": "application/json" },
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});

export const requestOTP = axios.create({
  baseURL: OTP_URL_REQUEST,
  header: { "Content-Type": "application/json" },
});

const OTP_SENDER = "DITO APP";
export const semaOTP = axios.create({
  baseURL: SEMAPHONE_ENDPOINT,
});
