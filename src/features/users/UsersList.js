import React from "react";
import { useSelector } from "react-redux";
import { selectAllusers } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectAllusers);

  const renderedUsers = users.map((user) => (
    <li className="user__li" key={user.id}>
      <Link className="user__link" to={`/user/${user.id}`}>
        {user.name}
      </Link>
    </li>
  ));

  return (
    <section>
      <h2>Authors</h2>
      <ul className="authors__ul">{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
