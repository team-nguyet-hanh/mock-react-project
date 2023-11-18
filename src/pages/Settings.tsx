/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field } from "formik";

import { useDispatch, useSelector } from "react-redux";

import { UpdateState } from "../redux/update/updateSlice";

import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../redux/currentUser/currentUserSlice";

import { useEffect, useState } from "react";

import { Col, Image, Row, Stack } from "react-bootstrap";

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

  const currentUser: UserType = useSelector(
    (state: { currentUser: { currentAccount: UserType } }) =>
      state.currentUser.currentAccount
  );
  const [preview, setPreview] = useState<any>(currentUser.image);
  const currentUpdatedUser = useSelector(
    (state: { updateUser: UpdateState }) => state.updateUser
  );

  useEffect(() => {
    dispatch(getCurrentUser());
    setPreview(currentUser.image);
    if (currentUpdatedUser.isSuccess) {
      notify();

      navigate(`/profile/${currentUpdatedUser?.updatedUser?.username}`);
    }
  }, [
    currentUpdatedUser.isSuccess,
    currentUpdatedUser?.updatedUser?.username,
    currentUser.image,
    dispatch,
    navigate,
  ]);

  return (
    <div className={formStyle.container}>
      <ModalSettings show={show} setShow={setShow} data={data} />

      <Col xs="8" sm="8" md="8">
        <h3 className="text-center m-3">Your settings</h3>

        <div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              file: currentUser.image || "",

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
                <Image
                  src={preview}
                  roundedCircle
                  width="100px"
                  height="100px"
                  className="mx-auto mb-2"
                  style={{ display: preview ? "block" : "none" }}
                />
                <div className="py-2 text-center">
                  <label htmlFor="file">
                    <i className="fa-solid fa-arrow-up-from-bracket border border-primary p-2 rounded"></i>
                  </label>

                  <span className="p-3">Upload an image</span>
                </div>
                <Row>
                  <Col>
                    <Stack>
                      <label htmlFor="image" className="fw-semibold fs-6">
                        Your Avatar:
                      </label>
                      <div>
                        <input
                          id="image"
                          className={formStyle.field}
                          value={
                            values.file.name ? values.file.name : values.file
                          }
                          onChange={(event) => {
                            setPreview(event.target.value);

                            setFieldValue("file", event.target.value);
                          }}
                        ></input>

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
                    </Stack>
                  </Col>
                  <Col>
                    <Stack>
                      <label htmlFor="username" className="fw-semibold fs-6">
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
                  </Col>
                </Row>

                <Row>
                  <Col>
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
                  </Col>
                  <Col>
                    <Stack>
                      <label
                        htmlFor="password"
                        className="fw-semibold fs-6 mt-3"
                      >
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
                  </Col>
                </Row>

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
                      style={{ height: "150px" }}
                    />
                  </div>
                </Stack>

                <Row className="justify-content-center">
                  <Col xs={3} md={2} lg={2}>
                    <button type="submit" className={formStyle.button}>
                      Submit
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
    </div>
  );
}

export default Settings;
