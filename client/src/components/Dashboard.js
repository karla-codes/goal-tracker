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
      // save the returned info and pass to Goal component
      console.log(userGoals);
      setGoals(userGoals);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function goalDetails() {
  //   goals.forEach(goal => {
  //     return <Goal goal={goal} />;
  //   });
  // }

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
        <Link to="/goals/new" className="link-button">
          Create New Goal
        </Link>
      </div>
      {/* Add goals here */}
      <div className="goal-container">
        {goals.map(goal => (
          <Goal goal={goal} key={goal._id} />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
