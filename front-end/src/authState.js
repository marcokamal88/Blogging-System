import { atom } from "recoil";

const isAuth = atom({
  key: "isAuthenticated",
  default: localStorage.getItem("token") ? true : false,
});

export default isAuth;
