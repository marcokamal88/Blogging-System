import axios from "axios";

export const myAxios = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
  timeout: 1000 * 60 * 2,
  headers: {
    authorization: "Bearer " + localStorage.getItem("token"),
  }
});