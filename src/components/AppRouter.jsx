import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Posts from "../pages/Posts.jsx";
import Login from "../pages/Login.jsx";
import { privateRoutes, publicRoutes } from "../router/routes.js";
import { AuthContext } from "../context/context.js";
import Loader from "./UI/Loader/Loader.jsx";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.component}
          exact={route.exact}
        />
      ))}

      <Route path="*" element={<Posts />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.component}
          exact={route.exact}
        />
      ))}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
