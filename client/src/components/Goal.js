import React from 'react';
import { Link } from 'react-router-dom';

function Goal() {
  return (
    <Link to="/goals/:id" className="goal">
      <h2>This is an example of a goal someone might have.</h2>
      <p className="goal-category">Category</p>
    </Link>
  );
}

export default Goal;
