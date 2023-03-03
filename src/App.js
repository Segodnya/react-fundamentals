import React, { useEffect, useState } from "react";
import ClassCounter from "./components/ClassCounter.jsx";
import Counter from "./components/Counter.jsx";
import PostForm from "./components/PostForm.jsx";
import PostsList from "./components/PostList.jsx";
import PostFilter from "./components/PostFilter.jsx";

import "./styles/App.css";
import MyModal from "./components/UI/MyModal/MyModal.jsx";
import MyButton from "./components/UI/button/MyButton.jsx";
import { usePosts } from "./hooks/usePosts.js";
import { useFetching } from "./hooks/useFetching.js";
import PostService from "./API/PostService.js";
import Loader from "./components/UI/Loader/Loader.jsx";
import { getPageCount } from "./utils/pages.js";
import Pagination from "./components/UI/Pagination/Pagination.jsx";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import About from "./pages/About.jsx";
import Posts from "./pages/Posts.jsx";
import Navbar from "./components/UI/Navbar/Navbar.jsx";
import Error from "./pages/Error.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
