import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  RegisterState,
  registerActions,
} from "../redux/register/registerSlice";
import { useEffect } from "react";
import signin from "./SignIn.module.css";
import Col from "react-bootstrap/Col";

interface MyFormValues {
  username: string;
  email: string;
  password: string;
}

function validateUser(value: string) {
  let error;
  if (!value) {
    error = "Username is required";
  }
  return error;
}

function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

function validatePassword(value: string) {
  let error;
  if (!value) {
    error = "Password is required";
  }
  if (value.length < 8) {
    error = "Your password is not strong enough";
  }
  return error;
}

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: MyFormValues = { email: "", password: "", username: "" };
  const registerSuccess = useSelector(
    (state: { register: RegisterState }) => state.register.isSuccess
  );
  useEffect(() => {
    if (registerSuccess) {
      navigate(`/login`);
    }
  }, [navigate, registerSuccess]);

  return (
    <div className={signin.container}>
      <Col lg="3" xs="8" sm="8" md="8">
        <div className={signin.icon}>
          <i className="fa-solid fa-user-plus"></i>
        </div>
        <h1 className="text-center mb-3">Register</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            dispatch(
              registerActions.signup({
                email: values.email,
                password: values.password,
                username: values.username,
              })
            );
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={signin.formGroup}>
                <label className={signin.label} htmlFor="user">
                  User name
                </label>
                <Field
                  id="user"
                  name="username"
                  placeholder="User name"
                  validate={validateUser}
                  className={signin.field}
                />
                {touched.username && errors.username && (
                  <div className={signin.error}>{errors.username}</div>
                )}
              </div>

              <div className={signin.formGroup}>
                <label className={signin.label} htmlFor="email">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  validate={validateEmail}
                  className={signin.field}
                />
                {touched.email && errors.email && (
                  <div className={signin.error}>{errors.email}</div>
                )}
              </div>

              <div className={signin.formGroup}>
                <label className={signin.label} htmlFor="password">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  validate={validatePassword}
                  className={signin.field}
                />
                {touched.password && errors.password && (
                  <div className={signin.error}>{errors.password}</div>
                )}
              </div>

              <button className={signin.button} type="submit">
                Sign up
              </button>
            </Form>
          )}
        </Formik>
        <Link className={signin.link} to="/login">
          Have an account? Sign in
        </Link>
      </Col>
    </div>
  );
}
