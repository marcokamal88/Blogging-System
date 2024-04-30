import "./style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../api/user";
import { useState } from "react";
import { useRecoilState } from "recoil";
import isAuth from "../../authState";
import { useNavigate, Link } from "react-router-dom";
const validation = Yup.object().shape({
  Email: Yup.string().email("invalid email").required("Required"),
  Password: Yup.string().min(8).required("Required"),
});
const Login = () => {
  const [response, setResponse] = useState(null);
  const [isLogged, setIsLoggedIn] = useRecoilState(isAuth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      let email = values.Email;
      let password = values.Password;
      login({ email, password })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data);
          setIsLoggedIn(true);
          setResponse("successfully loggedin");
          navigate("/Home");
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    },
  });
  return (
    <>
      <form className="from" onSubmit={formik.handleSubmit}>
        <h2 className="head">Login with your account</h2>
        <div className="container">
          <div className="Email field">
            <label>Email </label>
            <input
              className="email inpt"
              type="text"
              id="email"
              name="Email"
              placeholder="Enter Email"
              onChange={formik.handleChange}
            />
            {formik.errors.Email && formik.touched.Email ? (
              <div className="errors">*{formik.errors.Email}</div>
            ) : null}
          </div>
          <div className="Password field">
            <label>Password </label>
            <input
              className="password inpt"
              type="text"
              id="password"
              name="Password"
              placeholder="Enter password"
              onChange={formik.handleChange}
            />
            {formik.errors.Password && formik.touched.Password ? (
              <div className="errors">*{formik.errors.Password}</div>
            ) : null}
          </div>
          {response ? <div className="errors">*{response}</div> : null}
          <div className="submit">
            <button className="btn" type="submit">
              Login
            </button>
          </div>
            <Link to="/">Craet a new account</Link>
        </div>
      </form>
    </>
  );
};
export default Login;
