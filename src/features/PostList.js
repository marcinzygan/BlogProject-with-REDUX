import { useSelector } from "react-redux";
import { selectAllPosts } from "./post/postSlice";
import PostAuthor from "./post/PostAuthor";
import TimeAgo from "./post/TimeAgo";
import ReactionButtons from "./post/ReactionButtons";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  //Sort posts by date to render the new post as first one .
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
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
