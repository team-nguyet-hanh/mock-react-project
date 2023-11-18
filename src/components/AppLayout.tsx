import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import { Stack } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/authen/authSlice";

export default function AppLayout() {
  const location: string = useLocation().pathname;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authActions.reset())
  }, [dispatch, location])
  return (
    <Stack>
      <NavBar />
      <main>
        <Outlet/>
      </main>
    </Stack>
  );
}
