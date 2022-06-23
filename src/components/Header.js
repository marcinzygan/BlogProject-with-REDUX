import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, getCounter } from "../features/post/postSlice";

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCounter);
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li>
            <Link className="nav__link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav__link" to="post">
              Create Post
            </Link>
          </li>
          <li>
            <Link className="nav__link" to="user">
              Authors
            </Link>
          </li>
        </ul>
        {/* <button onClick={() => dispatch(increaseCount())}>{count}</button> */}
      </nav>
      <h1 className="h1">Redux Blog</h1>
    </header>
  );
};

export default Header;
