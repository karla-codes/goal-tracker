import React from 'react';
import { Link } from 'react-router-dom';

function Goal(props) {
  const { goal } = props;
  return (
    <Link to={`/goals/${goal._id}`} className="goal">
      <h2>{goal.goal}</h2>
      <p className="goal-category">{goal.category}</p>
    </Link>
  );
}

export default Goal;
