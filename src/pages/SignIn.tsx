import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthState, authActions } from "../redux/authen/authSlice";
import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import {
  RegisterState,
  registerActions,
} from "../redux/register/registerSlice";
import signin from "./SignIn.module.css";
interface MyFormValues {
  email: string;
  password: string;
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
  return error;
}

export default function SignIn() {
  const initialValues: MyFormValues = { email: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerSuccess = useSelector(
    (state: { register: RegisterState }) => state.register.isSuccess
  );
  const isLogged = useSelector(
    (state: { auth: AuthState }) => state.auth.isLoggedIn
  );
  const isInvalid = useSelector(
    (state: { auth: AuthState }) => state.auth.invalid
  );

  useEffect(() => {
    isLogged && navigate("/");
    dispatch(registerActions.registered());
  }, [dispatch, isLogged, navigate, registerSuccess]);

  return (
    <div className={signin.container}>
      <Col lg="3" xs="8" sm="8" md="8">
        <div className={signin.icon}>
          <i className="fa-solid fa-house-lock"></i>
        </div>

        <h1 className="text-center mb-3">Sign in</h1>

        {!isLogged && isInvalid ? (
          <div style={{ color: "red" }}>Email or password is invalid </div>
        ) : null}

        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            dispatch(
              authActions.login({
                email: values.email,
                password: values.password,
              })
            );
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Stack>
                <div className={signin.formGroup}>
                  <label className={signin.label} htmlFor="email">
                    Email
                  </label>

                  <Field
                    className={signin.field}
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    validate={validateEmail}
                  />
                  {touched.email && errors.email && (
                    <div className={signin.error}>{errors.email}</div>
                  )}
                </div>
              </Stack>

              <Stack>
                <div className={signin.formGroup}>
                  <label className={signin.label} htmlFor="password">
                    Password
                  </label>

                  <Field
                    className={signin.field}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    validate={validatePassword}
                  />

                  {touched.password && errors.password && (
                    <div className={signin.error}>{errors.password}</div>
                  )}
                </div>
              </Stack>

              <button className={signin.button} type="submit">
                Sign in
              </button>
            </Form>
          )}
        </Formik>
        <Link className={signin.link} to="/register">
          Need an account? Sign up
        </Link>
      </Col>
    </div>
  );
}
