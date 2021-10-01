import React from 'react';

function Navigation(props) {
  // const user
  return (
    <header>
      <h1>Goal Tracker</h1>
      <nav>
        {/* If user is logged in */}
        <span>Welcome, Person!</span>
        <a href="">Sign Out</a>
      </nav>
    </header>
  );
}

export default Navigation;
