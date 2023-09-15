import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import { authActions } from "../redux/authen/authSlice";

export default function NavBar() {
  // const { userId }: { userId: string } = useParams();
  const dispatch = useDispatch();
  const isLogged = useSelector((state: any) => state.auth.isLoggedIn);
  const isSignUp = useSelector((state: any) => state.register.isSuccess);
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Nav>
        <Nav.Item>
          <Nav.Link href="/#">conduit</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/#">home</Nav.Link>
        </Nav.Item>

        {!isLogged && !isSignUp && (
          <>
            <Nav.Item>
              <Nav.Link href="/login">Log in</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
          </>
        )}

        { isLogged && (
          <>
            <Nav.Item>
              <Nav.Link href="/editor">New article</Nav.Link>
            </Nav.Item>{" "}
            <Nav.Item>
              <Nav.Link href="/settings">Setting</Nav.Link>
            </Nav.Item>
          </>
        )}

        {isLogged && (
          <Nav.Item>
            <button onClick={handleLogout}>Log out</button>
          </Nav.Item>
        )}
    </Nav>
  );
}
