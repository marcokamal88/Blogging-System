import "./style.css";
import { useFormik } from "formik";
import { register } from "../../api/user";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";

const validation = Yup.object().shape({
  Name: Yup.string().required("Required"),
  Email: Yup.string().email("invalid email").required("Required"),
  Password: Yup.string().min(8).required("Required"),
  Role: Yup.string().required("required"),
});

const Register = () => {
  const [response, setResponse] = useState(null);
  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      Role: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      let name = values.Name;
      let email = values.Email;
      let password = values.Password;
      let role = values.Role;
      register({ name, email, password, role })
        .then((res) => {
          console.log(res.data);
          setResponse(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.error);
          setResponse(err.response.data.error);
        });
    },
  });
  return (
    <>
      <form className="from" onSubmit={formik.handleSubmit}>
        <h2 className="head">Create new account</h2>
        <div className="container">
          <div className="Name field">
            <label>Name </label>
            <input
              className="email inpt"
              type="text"
              id="name"
              name="Name"
              placeholder="Enter Name"
              onChange={formik.handleChange}
            />
            {formik.errors.Email && formik.touched.Email ? (
              <div className="errors">*{formik.errors.Email}</div>
            ) : null}
          </div>
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
          <div className="Role field">
            <label>Role </label>
            <select
              className="Role inpt"
              id="role"
              name="Role"
              required
              placeholder="Enter Role"
              onChange={formik.handleChange}
            >
              <option>User</option>
              <option>Author</option>
            </select>
            {formik.errors.Password && formik.touched.Password ? (
              <div className="errors">*{formik.errors.Password}</div>
            ) : null}
          </div>
          {response ? <div className="errors">*{response}</div> : null}
          <div className="submit">
            <button className="btn" type="submit">
              Register
            </button>
          </div>
          <Link to="/Login">already have an account</Link>
        </div>
      </form>
    </>
  );
};
export default Register;
