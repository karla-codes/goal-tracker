import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(props) {
  // const user
  return (
    <header>
      <Link to="/goals" className="logo">
        Goal Tracker
      </Link>
      <nav>
        {/* If user is logged in */}
        <span>Welcome, Person!</span>
        <a href="">Sign Out</a>
      </nav>
    </header>
  );
}

export default Navigation;
