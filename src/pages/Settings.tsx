/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field } from "formik";

import { useDispatch, useSelector } from "react-redux";

import { UpdateState } from "../redux/update/updateSlice";

import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../redux/currentUser/currentUserSlice";

import { useEffect, useState } from "react";

import { Col, Image, Stack } from "react-bootstrap";

import formStyle from "./SignIn.module.css";

import ModalSettings from "../components/ModelSettings";

import toast from "react-hot-toast";
import { UserType } from "../models/user";

const notify = () =>
  toast.success("Successfully register!", {
    id: "clipboard",
  });

function Settings() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Show popup

  const [show, setShow] = useState(false);

  const [data, setData] = useState({});

  // upload files

  const [preview, setPreview] = useState<any>(null);

  const currentUser: UserType = useSelector(
    (state: { currentUser: { currentAccount: UserType } }) =>
      state.currentUser.currentAccount
  );

  const currentUpdatedUser = useSelector(
    (state: { updateUser: UpdateState }) => state.updateUser
  );

  useEffect(() => {
    dispatch(getCurrentUser());

    if (currentUpdatedUser.isSuccess) {
      notify();

      navigate(`/${currentUpdatedUser?.updatedUser?.username}`);
    }
  }, [
    currentUpdatedUser.isSuccess,

    currentUpdatedUser?.updatedUser?.username,

    dispatch,

    navigate,
  ]);

  return (
    <div className={formStyle.container}>
      <ModalSettings show={show} setShow={setShow} data={data} />

      <Col lg="3" xs="8" sm="8" md="8">
        <h3 className="text-center m-3">Your settings</h3>

        <div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              file: File || "",

              username: currentUser.username || "",

              bio: currentUser.bio || "",

              email: currentUser.email || "",

              password: "123456" || "",
            }}
            onSubmit={async (values: any) => {
              if (values.file.name) {
                const formData = new FormData();

                formData.append("file", values.file);

                formData.append("upload_preset", "tj5ptm50");

                formData.append("api_key", "972818785248541");

                await fetch(
                  "https://api.cloudinary.com/v1_1/duftx27u4/image/upload",

                  { method: "POST", body: formData }
                )
                  .then((response) => response.json())

                  .then((res) => {
                    setData({
                      image: res.url,

                      username: values.username,

                      bio: values.bio,

                      email: values.email,

                      password: values.password,
                    });

                    setShow(true);
                  });
              } else {
                setData({
                  image: values.file,

                  username: values.username,

                  bio: values.bio,

                  email: values.email,

                  password: values.password,
                });

                setShow(true);
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Stack>
                  <label htmlFor="image" className="fw-semibold fs-6">
                    Your Avatar:
                  </label>
                  <div>
                    <input
                      id="image"
                      className={formStyle.field}
                      value={
                        values.file instanceof File
                          ? values.file.name
                          : values.file
                      }
                      onChange={(event) => {
                        setPreview(event.target.value);

                        setFieldValue("file", event.target.value);
                      }}
                    ></input>

                    <div className="py-2">
                      <label htmlFor="file">
                        <i className="fa-solid fa-arrow-up-from-bracket border border-primary p-2 rounded"></i>
                      </label>

                      <span className="p-3">Upload an image</span>
                    </div>

                    <Field
                      style={{ display: "none" }}
                      id="file"
                      name="file"
                      type="file"
                      value={""}
                      onChange={(event: any) => {
                        const file = new FileReader();
                        file.onload = () => setPreview(file.result);
                        file.readAsDataURL(event.currentTarget.files[0]);
                        setFieldValue("file", event.currentTarget.files[0]);
                      }}
                    />
                  </div>

                  <Image
                    src={preview}
                    roundedCircle
                    width="100px"
                    height="100px"
                    className="mx-auto mb-2"
                    style={{ display: preview ? "block" : "none" }}
                  />
                </Stack>

                <Stack>
                  <label htmlFor="username" className="fw-semibold fs-6 mt-3">
                    User Name:
                  </label>
                  <div>
                    <Field
                      className={formStyle.field}
                      id="username"
                      name="username"
                      placeholder="Your User Name"
                    />
                  </div>
                </Stack>

                <Stack>
                  <label htmlFor="bio" className="fw-semibold fs-6 mt-3">
                    Your Bio:
                  </label>
                  <div>
                    <Field
                      className={formStyle.textareaField}
                      as="textarea"
                      id="bio"
                      name="bio"
                      placeholder="Short bio about you"
                    />
                  </div>
                </Stack>

                <Stack>
                  <label htmlFor="email" className="fw-semibold fs-6 mt-3">
                    Your email:
                  </label>
                  <div>
                    <Field
                      className={formStyle.field}
                      id="email"
                      name="email"
                      placeholder="Your email"
                    />
                  </div>
                </Stack>

                <Stack>
                  <label htmlFor="password" className="fw-semibold fs-6 mt-3">
                    Your password:
                  </label>
                  <div>
                    <Field
                      className={formStyle.field}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                </Stack>

                <Stack>
                  <button type="submit" className={formStyle.button}>
                    Submit
                  </button>
                </Stack>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
    </div>
  );
}

export default Settings;
