import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { authActions } from "../redux/authen/authSlice";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function NavBar() {
  // const { userId }: { userId: string } = useParams();
  const dispatch = useDispatch();
  const isLogged = useSelector((state: any) => state.auth.isLoggedIn);
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Nav className="d-flex gap-3 align-items-center">
      <Nav.Item>
        <NavLink to="/#">conduit</NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink to="/#">home</NavLink>
      </Nav.Item>

      {!isLogged && (
        <>
          <Nav.Item>
            <NavLink to="/login">Log in</NavLink>
          </Nav.Item>

          <Nav.Item>
            <NavLink to="/register">Register</NavLink>
          </Nav.Item>
        </>
      )}

      {isLogged && (
        <>
          <Nav.Item>
            <NavLink to="/editor">New article</NavLink>
          </Nav.Item>{" "}
          <Nav.Item>
            <NavLink to="/settings">Setting</NavLink>
          </Nav.Item>
        </>
      )}

      {isLogged && (
        <DropdownButton id="dropdown-item-button" title={`${currentUser?.username}`}>
          <Dropdown.Item as="button">
            <NavLink to={`/${currentUser?.username}`}>Profile</NavLink>
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={handleLogout}>Log out</Dropdown.Item>
        </DropdownButton>
      )}
    </Nav>
  );
}
