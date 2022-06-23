import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { selectAllPosts, getPostStatus, getPostsError } from "./postSlice";

import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostStatus);
  const error = useSelector(getPostsError);

  //Sort posts by date to render the new post as first one .

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading ...</p>;
  }
  if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt key={nanoid()} post={post} />
    ));
  }
  if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section className="posts__container">
      <h2 className="posts__h2">Our latest Posts:</h2>
      {content}
    </section>
  );
};

export default PostList;
