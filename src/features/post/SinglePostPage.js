import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams, Link } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <article className="post post__single">
      <h2 className="post__title">{post.title}</h2>
      <p className="post__text">{post.body}</p>
      <div className="post__info">
        <p className="post__author">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <Link className="post__link" to={`/post/edit/${post.id}`}>
          Edit Post
        </Link>
      </div>

      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
