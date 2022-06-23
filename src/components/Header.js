import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
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
      </nav>
      <h1 className="h1">Redux Blog</h1>
    </header>
  );
};

export default Header;
