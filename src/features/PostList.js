import { useSelector } from "react-redux";
import { selectAllPosts } from "./post/postSlice";
import PostAuthor from "./post/PostAuthor";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const renderPosts = posts.map((post) => (
    <article key={post.id}>
      <PostAuthor userId={post.userId} />
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  );
};

export default PostList;
