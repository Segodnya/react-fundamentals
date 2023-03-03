import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About.jsx";
import Posts from "../pages/Posts.jsx";
import Error from "../pages/Error.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
