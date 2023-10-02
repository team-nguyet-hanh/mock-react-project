import { useDispatch, useSelector } from "react-redux";
import FollowBtnStyle from "./FollowBtn.module.css";

import {
  FollowState,
  following,
  unfollowing,
} from "../redux/follow/followSlice";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FollowBtn({ currentProfile }: any) {
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("access_token");

  const followUpdated = useSelector(
    (state: { follow: FollowState }) => state.follow.profileUpdate
  );

  const followHandler = () => {
    if (access_token) {
      if (followUpdated.username === currentProfile.username) {
        if (followUpdated.following) {
          dispatch(unfollowing(currentProfile.username));
        } else {
          dispatch(following(currentProfile.username));
        }
      } else {
        if (currentProfile.following) {
          dispatch(unfollowing(currentProfile.username));
        } else {
          dispatch(following(currentProfile.username));
        }
      }
    } else {
      window.location.href = "/register";
    }
  };

  const handleStatus = () => {
    if (followUpdated.username === currentProfile?.username) {
      return followUpdated.following ? (
        <div className={FollowBtnStyle.follow}>
          <i className="fa-solid fa-user-check pe-1" />
          Unfollow
        </div>
      ) : (
        <div className={FollowBtnStyle.unfollow}>
          <i className="fa-solid fa-user-plus pe-1" />
          Follow
        </div>
      );
    } else {
      return currentProfile?.following ? (
        <div className={FollowBtnStyle.follow}>
          <i className="fa-solid fa-user-check pe-1" />
          Unfollow
        </div>
      ) : (
        <div className={FollowBtnStyle.unfollow}>
          <i className="fa-solid fa-user-plus pe-1" />
          Follow
        </div>
      );
    }
  };
  return (
    <div onClick={() => followHandler()} className={FollowBtnStyle.status}>
      {handleStatus()}
    </div>
  );
}
