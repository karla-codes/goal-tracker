import React from 'react';
import { Link } from 'react-router-dom';

import Goal from './Goal';

function Dashboard() {
  return (
    <main>
      <div className="dashboard-info">
        <div>
          <h2>Goal Dashboard</h2>
          <p>
            Select a goal to view/edit goal details and a dedicated journal to
            document your progress.
          </p>
        </div>
        <Link to="/goals/new">Create New Goal</Link>
      </div>
      {/* Add goals here */}
      <div className="goal-container">
        <Goal />
        <Goal />
        <Goal />
      </div>
    </main>
  );
}

export default Dashboard;
