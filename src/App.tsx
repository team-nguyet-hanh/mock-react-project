import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Editor from "./pages/Editor";
import Settings from "./pages/Settings";
import User from "./pages/User";
import Article from "./pages/ArticleID";
import FavArticleList from "./components/FavArticleList";


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/#", element: <Home /> },
      { path: "/login", element: <SignIn /> },
      { path: "/register", element: <SignUp /> },
      { path: "/editor", element: <Editor /> },
      { path: "/settings", element: <Settings /> },
      {
        path: "/:userId",
        element: <User />,
        children: [{ path: "favorites", element: <FavArticleList /> }],
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
