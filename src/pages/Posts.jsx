import React, { useRef, useEffect, useState } from "react";
import ClassCounter from "../components/ClassCounter.jsx";
import Counter from "../components/Counter.jsx";
import PostsList from "../components/PostList.jsx";
import MyButton from "../components/UI/button/MyButton.jsx";
import PostForm from "../components/PostForm.jsx";
import PostFilter from "../components/PostFilter.jsx";
import MyModal from "../components/UI/MyModal/MyModal.jsx";
import { usePosts } from "../hooks/usePosts.js";
import PostService from "../API/PostService.js";
import Loader from "../components/UI/Loader/Loader.jsx";
import { useFetching } from "../hooks/useFetching.js";
import { getPageCount } from "../utils/pages.js";
import Pagination from "../components/UI/Pagination/Pagination.jsx";
import { useObserver } from "../hooks/useObserver.jsx";
import MySelect from "../components/UI/select/MySelect.jsx";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // Получаем post из дочернего элемента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
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
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать все" },
        ]}
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostsList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Языки программирования"
      />
      <div
        ref={lastElement}
        style={{ height: 20, marginTop: 20, background: "teal" }}
      />
      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
