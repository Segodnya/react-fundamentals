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

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // Получаем post из дочернего элемента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  /* const bodyInputRef = useRef(); */

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <Counter />
      <ClassCounter />
      {/* <PostsList posts={posts2} title="Футбольные клубы" /> */}
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {isPostsLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <PostsList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Языки программирования"
        />
      )}
    </div>
  );
}

export default App;
