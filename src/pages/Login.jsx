import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format"
      )
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
      navigate("/");
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        {errors.email ? (
          <div style={{ color: "red", fontSize: "12px" }}>{errors.email}</div>
        ) : null}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          onChange={handleChange}
          value={values.password}
        />
        {errors.password ? (
          <div style={{ color: "red", fontSize: "12px" }}>
            {errors.password}
          </div>
        ) : null}
        <div style={{ marginTop: "10px" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
