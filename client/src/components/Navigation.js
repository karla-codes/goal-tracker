import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(props) {
  const { context } = props;
  const { authUser } = context;
  // check if an authorized user exists
  // if true, set welcome message in nav
  console.log(authUser);
  return (
    <header>
      <Link to="/goals" className="logo">
        Goal Tracker
      </Link>
      <nav>
        {/* If user is logged in */}
        {authUser ? <span>Welcome, {authUser.name}!</span> : ''}
        {authUser ? <Link to="/signout">Sign Out</Link> : ''}
      </nav>
    </header>
  );
}

export default Navigation;
