import axios from "axios";

export const myAxios = axios.create({
  baseURL: process.env.AXIOS_BASE_URL,
  timeout: 1000 * 60 * 2,
});
