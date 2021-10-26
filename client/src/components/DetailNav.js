import React from 'react';
import { Link } from 'react-router-dom';

function DetailNav(props) {
  const { goalId } = props;
  return (
    <div className="detail-nav">
      <Link to="/goals">Back to Goals</Link>
      <div>
        <Link to={`/goals/${goalId}/edit`}>Edit Goal</Link>
        <Link to={`/goals/${goalId}/delete`}>Delete Goal</Link>
      </div>
    </div>
  );
}

export default DetailNav;
