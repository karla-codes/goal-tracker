import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(props) {
  const { context } = props;
  const { authUser } = context;
  // check if an authorized user exists
  // if true, set welcome message in nav
  return (
    <header>
      <Link to={authUser ? '/goals' : ''} className="logo">
        Goal Pad
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
