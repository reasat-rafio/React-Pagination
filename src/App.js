import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Components/Post";
import Pagination from "./Components/Pagination";

function App() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((res) => setPost(res));
    setLoading(false);
  }, []);

  //Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mb-5">
      <h1 className="tex-primary" mb-3>
        My blog
      </h1>
      <Post posts={currentPosts} loading={loading} />
      <Pagination
        paginate={paginate}
        postPerPage={postPerPage}
        totalPosts={posts.length}
      />
    </div>
  );
}

export default App;
