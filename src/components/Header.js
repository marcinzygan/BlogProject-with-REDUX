import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, getCounter } from "../features/post/postSlice";

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCounter);
  return (
    <header>
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Post</Link>
          </li>
          <li>
            <Link to="user">Users</Link>
          </li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </nav>
    </header>
  );
};

export default Header;
