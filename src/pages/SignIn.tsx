import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../redux/authen/authSlice";
import { useEffect } from "react";
import { registerActions } from "../redux/register/registerSlice";


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
  const isLogged = useSelector((state: any) => state.auth.isLoggedIn);
  const isInvalid = useSelector((state: any) => state.auth.invalid);

  useEffect(() => {
    isLogged && navigate("/#/");
    dispatch(registerActions.registered());
  }, [dispatch, isLogged, navigate]);

  return (
    <div>
      <h1>Sign in</h1>
      <Link to="/register">Need an account?</Link>
      {!isLogged && isInvalid && (
        <div style={{ color: "red" }}>Email or password is invalid </div>
      )}

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
            <div>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="Email"
                validate={validateEmail}
              />
              {touched.email && errors.email && <div>{errors.email}</div>}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                placeholder="Password"
                validate={validatePassword}
              />
              {touched.password && errors.password && (
                <div>{errors.password}</div>
              )}
            </div>

            <button type="submit">Sign in</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
