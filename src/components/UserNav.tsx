import NavbarStyle from "./NavbarStyle.module.css";

import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../redux/authen/authSlice";

import { NavLink, useNavigate } from "react-router-dom";

import Image from "react-bootstrap/Image";

import { getProfile } from "../redux/profile/profleSlice";

import { Nav, NavDropdown } from "react-bootstrap";
import { UserType } from "../models/user";

const UserNav = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user_name = localStorage.getItem("user_name");

  const currentUser = useSelector(
    (state: { currentUser: { currentAccount: UserType } }) =>
      state.currentUser.currentAccount
  );

  const updatedUser = useSelector(
    (state: { updateUser: { updatedUser: UserType } }) =>
      state.updateUser.updatedUser
  );

  const handleLogout = () => {
    dispatch(authActions.logout());

    navigate("/#");
  };

  return (
    <>
      <Nav.Item className={`${NavbarStyle.NavItem} ${NavbarStyle.desktop}`}>
        <NavLink className={NavbarStyle.Link} to="/editor">
          <i className="fa-solid fa-pen-to-square"></i>
          New article
        </NavLink>
      </Nav.Item>{" "}
      <Nav.Item className={`${NavbarStyle.NavItem} ${NavbarStyle.desktop}`}>
        <NavLink className={NavbarStyle.Link} to="/settings">
          <i className="fa-solid fa-gear"></i>
          Settings
        </NavLink>
      </Nav.Item>
      <div
        className={`${NavbarStyle.DropdownContainer} ${NavbarStyle.desktop}`}
      >
        <Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={
              <>
                <Image
                  src={currentUser.image}
                  roundedCircle
                  width="32px"
                  height="32px"
                  className="me-2"
                />

                <span>{updatedUser ? updatedUser.username : user_name}</span>
              </>
            }
            menuVariant="dark"
          >
            <NavDropdown.Item
              onClick={() => {
                dispatch(getProfile(currentUser.username));

                navigate(`/${currentUser.username}`);
              }}
              className={NavbarStyle.item}
            >
              Profile
            </NavDropdown.Item>

            <NavDropdown.Item
              as="button"
              onClick={handleLogout}
              className={NavbarStyle.logout}
            >
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
      {/* Mobile */}
      <div className={NavbarStyle.DropdownContainerMobile}>
        <Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={
              <Image
                src={currentUser.image}
                roundedCircle
                width="32px"
                height="32px"
                className="me-2"
              />
            }
            menuVariant="dark"
          >
            <NavDropdown.Item
              onClick={() => {
                dispatch(getProfile(currentUser.username));

                navigate(`/${currentUser.username}`);
              }}
              className={NavbarStyle.item}
            >
              Profile
            </NavDropdown.Item>

            <NavDropdown.Item
              as="button"
              className={NavbarStyle.item}
              onClick={() => navigate("/editor")}
            >
              New article
            </NavDropdown.Item>

            <NavDropdown.Item
              as="button"
              className={NavbarStyle.item}
              onClick={() => navigate("/settings")}
            >
              Settings
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item
              as="button"
              onClick={handleLogout}
              className={NavbarStyle.logout}
            >
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    </>
  );
};

export default UserNav;
