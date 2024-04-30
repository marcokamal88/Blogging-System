/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import isAuthState from "./authState";
import { useRecoilState } from "recoil";

export default function ProtectedRoute({ children }) {
  const { pathname } = useLocation();
  const [auth] = useRecoilState(isAuthState);
  console.log(auth, pathname);
  if (
    (auth && pathname.toLocaleLowerCase() === "/login") ||
    (auth && pathname.toLocaleLowerCase() === "/register")
  ) {
    return <Navigate to="/Home" />;
  }
  if (!auth && pathname.toLocaleLowerCase() !== "/login") {
    if (pathname.toLocaleLowerCase() === "/register") {
      return <Navigate to="/Register" />;
    } else return <Navigate to="/Login" />;
  }

  return children;
}
