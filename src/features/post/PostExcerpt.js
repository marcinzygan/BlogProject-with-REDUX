import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

let PostExcerpt = ({ post }) => {
  return (
    <article className="post">
      <h3 className="post__title">{post.title}</h3>
      <p className="post__text">{post.body.substring(0, 75)}...</p>
      <div className="post__info">
        <p className="post__author">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <Link className="post__link" to={`post/${post.id}`}>
          View Post
        </Link>
      </div>
      <ReactionButtons post={post} />
    </article>
  );
};
PostExcerpt = React.memo(PostExcerpt);
export default PostExcerpt;
