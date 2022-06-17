import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostStatus,
  getPostsError,
  fetchPosts,
} from "./post/postSlice";

import { useEffect } from "react";
import PostExcerpt from "./post/PostExcerpt";

const PostList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

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
      <PostExcerpt key={post.id} post={post} />
    ));
  }
  if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostList;
