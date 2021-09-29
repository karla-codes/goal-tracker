import React from 'react';

function Navigation(props) {
  // const user
  return (
    <header>
      <div>
        <h1>Goal Tracker</h1>
      </div>
      <nav>
        {/* If user is logged in */}
        <span>Welcome, Person!</span>
        <a href="">Sign Out</a>
      </nav>
    </header>
  );
}

export default Navigation;
