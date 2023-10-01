import Nav from "react-bootstrap/Nav";

import NavbarStyle from "./NavbarStyle.module.css";

import Col from "react-bootstrap/Col";

import { useDispatch, useSelector } from "react-redux";

import { AuthState } from "../redux/authen/authSlice";

import { NavLink } from "react-router-dom";

import { getCurrentUser } from "../redux/currentUser/currentUserSlice";

import { useEffect } from "react";

import { Dropdown, Row } from "react-bootstrap";

import UserNav from "./UserNav";

export default function NavBar() {
  const dispatch = useDispatch();

  const isLogged: boolean = useSelector(
    (state: { auth: AuthState }) => state.auth.isLoggedIn
  );

  useEffect(() => {
    isLogged && dispatch(getCurrentUser());
  }, [dispatch, isLogged]);

  return (
    <div className={NavbarStyle.Container}>
      <Row>
        <Col className="d-flex justify-content-start">
          <Nav className={NavbarStyle.LogoContainer}>
            <Nav.Item className={NavbarStyle.NavItem}>
              <NavLink to="/#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Medium_%28website%29_logo.svg/1196px-Medium_%28website%29_logo.svg.png"
                  alt="logo"
                  width="180px"
                />
              </NavLink>
            </Nav.Item>
          </Nav>
        </Col>

        {/* // desktop */}

        <Col className="d-flex justify-content-end">
          <Nav className={NavbarStyle.homeMenuDeskTop}>
            <Nav.Item className={NavbarStyle.NavItem}>
              <NavLink className={NavbarStyle.Link} to="/#">
                <i className="fa-solid fa-house"></i>
                Home
              </NavLink>
            </Nav.Item>

            {isLogged && <UserNav />}

            {!isLogged && (
              <>
                <Nav.Item className={NavbarStyle.NavItem}>
                  <NavLink className={NavbarStyle.Link} to="/login">
                    Log in
                  </NavLink>
                </Nav.Item>

                <Nav.Item className={NavbarStyle.NavItem}>
                  <NavLink className={NavbarStyle.Link} to="/register">
                    Register
                  </NavLink>
                </Nav.Item>
              </>
            )}
          </Nav>

          {/* // mobile */}

          <Nav className={NavbarStyle.homeMenuMobile}>
            {isLogged && <UserNav />}

            {!isLogged && (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <i className="fa-solid fa-bars"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Nav.Item className={NavbarStyle.NavItem}>
                        <NavLink className={NavbarStyle.Link} to="/#">
                          Home
                        </NavLink>
                      </Nav.Item>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <Nav.Item className={NavbarStyle.NavItem}>
                        <NavLink className={NavbarStyle.Link} to="/login">
                          Log in
                        </NavLink>
                      </Nav.Item>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <Nav.Item className={NavbarStyle.NavItem}>
                        <NavLink className={NavbarStyle.Link} to="/register">
                          Register
                        </NavLink>
                      </Nav.Item>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Col>
      </Row>
    </div>
  );
}
