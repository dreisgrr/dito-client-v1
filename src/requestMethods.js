import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
const OTP_URL_REQUEST =
  "https://u7xnwkt996.execute-api.ap-southeast-1.amazonaws.com/DEV/generate";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.subscriber;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});

export const requestOTP = axios.create({
  baseURL: OTP_URL_REQUEST,
  header: { "Content-Type": "application/json" },
});
