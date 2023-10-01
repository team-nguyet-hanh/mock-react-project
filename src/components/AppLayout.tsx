import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function AppLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
