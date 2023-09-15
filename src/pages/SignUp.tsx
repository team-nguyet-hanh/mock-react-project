import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerActions } from "../redux/register/registerSlice";
import { useEffect } from "react";

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
  const registerSuccess = useSelector((state: any) => state.register.isSuccess);
  const currentUser = useSelector((state: any) => state.register.newUser);
  useEffect(() => {
    if (registerSuccess && currentUser) {
      navigate(`/login`);
    }
  }, [currentUser, navigate, registerSuccess]);

  return (
    <div>
      <h1>Sign Up </h1>
      <Link to="/login">Have an account?</Link>
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
            <div>
              <label htmlFor="user">User name</label>
              <Field
                id="user"
                name="username"
                placeholder="User name"
                validate={validateUser}
              />
              {touched.username && errors.username && (
                <div>{errors.username}</div>
              )}
            </div>

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

            <button type="submit">Sign up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
