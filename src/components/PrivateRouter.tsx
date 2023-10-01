import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  return (
    <div>{isLoggedIn ? <Outlet /> : <Navigate to="/login"></Navigate>}</div>
  );
};
export default PrivateRouter;
