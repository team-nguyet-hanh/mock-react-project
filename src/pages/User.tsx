import { useEffect, useState } from "react";

import Image from "react-bootstrap/Image";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getProfile } from "../redux/profile/profleSlice";

import FavArticleList from "../components/FavArticleList";

import { UserType } from "../models/user";

import UserStyle from "./User.module.css";

import { FollowBtn } from "../components/FollowBtn";

import { updateUserActions } from "../redux/update/updateSlice";

import ModalBio from "../components/ModalBio";

export default function User() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation().pathname.slice(1);

  const currentAccount: string | undefined = useParams().userId;

  const userName = localStorage.getItem("user_name");

  const [active, setActive] = useState("");

  const currentProfile = useSelector(
    (state: { profile: { currentUser: { profile: UserType } } }) =>
      state.profile.currentUser.profile
  );

  const updatedUser = useSelector(
    (state: { updateUser: { isUpdateLoading: boolean } }) =>
      state.updateUser.isUpdateLoading
  );

  const isFail = useSelector(
    (state: { profile: { isFail: boolean } }) => state.profile.isFail
  );

  useEffect(() => {
    isFail && navigate("/");

    if (!updatedUser) {
      dispatch(getProfile(currentAccount));
    }

    dispatch(updateUserActions.resetUpdate());

    location.includes("favorites")
      ? setActive("favorited")
      : setActive("my-article");
  }, [dispatch, location, currentAccount, updatedUser, isFail, navigate]);

  // Show pop up details bio

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <div className={UserStyle.header}>
        <div className={UserStyle.wrapper}>
          <div className={UserStyle.box}>
            <Image
              src={currentProfile?.image}
              roundedCircle
              width="150px"
              height="150px"
            />
          </div>
        </div>

        <p className={UserStyle.title}>{currentProfile?.username}</p>

        <div className={UserStyle.bio} onClick={handleShow}>
          <p>{currentProfile?.bio}</p>
        </div>

        <ModalBio show={show} setShow={setShow} bio={currentProfile?.bio} />

        <div>
          {userName === currentAccount ? (
            <Link className={UserStyle.edit} to="/settings">
              <i className="fa-solid fa-gear"></i>
              Edit profile settings
            </Link>
          ) : (
            <div className="d-flex justify-content-center">
              <FollowBtn currentProfile={currentProfile} />
            </div>
          )}
        </div>
      </div>

      <div className={UserStyle.nav}>
        <ul className="nav nav-underline">
          <li className="nav-item">
            <div
              className={`nav-link ${
                active === "my-article" ? "active" : null
              } fw-bold`}
              aria-current="page"
              id="my-article"
              onClick={(e) => {
                navigate(`/${currentProfile.username}`);

                setActive((e.target as HTMLTextAreaElement).id);
              }}
            >
              My article
            </div>
          </li>

          <li className="nav-item">
            <div
              className={`nav-link ${
                active === "favorited" ? "active" : null
              } fw-bold`}
              aria-current="page"
              id="favorited"
              onClick={(e) => {
                dispatch(getProfile(currentAccount));

                setActive((e.target as HTMLTextAreaElement).id);

                navigate("favorites");
              }}
            >
              Favorited article
            </div>
          </li>
        </ul>
      </div>

      <FavArticleList />
    </>
  );
}
