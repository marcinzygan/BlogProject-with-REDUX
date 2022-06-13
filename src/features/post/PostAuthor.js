import React from "react";
import { useSelector } from "react-redux";
import { selectAllusers } from "../users/usersSlice";

const PostAuthor = (props) => {
  const users = useSelector(selectAllusers);

  const author = users.find((user) => user.id === props.userId);
  return <span>by: {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
