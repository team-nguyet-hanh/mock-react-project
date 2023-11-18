import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Editor from "./pages/Editor";
import Settings from "./pages/Settings";
import User from "./pages/User";
import Article from "./pages/ArticleID";
import PrivateRouter from "./components/PrivateRouter";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    path: "/",
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      { path: "/home", element: <Home /> },

      { path: "/login", element: <SignIn /> },

      { path: "/register", element: <SignUp /> },

      {
        path: "/",
        element: <PrivateRouter />,
        children: [
          {
            path: "/editor", element: <Editor />,
          },
          { path: "/settings", element: <Settings /> },
        ],
      },
      {
        path: "/editor",

        element: <Editor />,

        children: [{ path: ":slug", element: <Editor /> }],
      },

      { path: "/settings", element: <Settings /> },

      {
        path: "/profile/:userId",

        element: <User />,

        children: [{ path: "favorites", element: <User /> }],
      },

      {
        path: "/article/:articleId",

        element: <Article />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
