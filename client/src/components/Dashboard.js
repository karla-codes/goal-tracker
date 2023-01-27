import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Goal from './Goal';

function Dashboard(props) {
  const { context } = props;
  const { authUser, data } = context;
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // use api request to fetch data
      const userGoals = await data
        .getGoals(authUser)
        .then(data => data)
        .catch(err => console.log(err));
      setGoals(userGoals);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="dashboard-info">
        <div>
          <h1>Dashboard</h1>
          <p>Select a goal to view/edit goal details.</p>
        </div>
        <Link to="/goals/new" className="link-button">
          Create New Goal
        </Link>
      </div>
      {/* Add goals here */}
      <div className="goal-container">
        {goals.map(goal => <Goal goal={goal} key={goal._id} />).reverse()}
      </div>
    </main>
  );
}

export default Dashboard;
