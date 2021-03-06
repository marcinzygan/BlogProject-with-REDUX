import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectPostByUser } from "../post/postSlice";
import { Link, useParams } from "react-router-dom";

import React from "react";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) =>
    selectPostByUser(state, Number(userId))
  );
  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <section>
      <h2>
        <span className="author">{user?.name}</span> posts.{" "}
      </h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
