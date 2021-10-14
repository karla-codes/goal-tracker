import React, { useEffect, useState } from 'react';
// import JournalPage from './JournalPage';
import DetailNav from './DetailNav';
import { useParams } from 'react-router';

function GoalDetail(props) {
  const { context } = props;
  const { data, authUser } = context;
  const { id } = useParams();
  const [goalDetails, setGoalDetails] = useState({});

  useEffect(() => {
    const fetchGoals = async () => {
      const goalDetails = await data
        .getGoal(id, authUser)
        .then(data => data)
        .catch(err => {
          console.log(err);
          props.history.push('/errors');
        });

      console.log(authUser);
      console.log(goalDetails);

      if (goalDetails.message) {
        console.log(goalDetails.message);
        props.history.push('/notfound');
      } else {
        setGoalDetails(goalDetails);
      }
    };

    fetchGoals();
  }, []);

  return (
    <main>
      <DetailNav goalId={id} />
      <div className="goal-details">
        <div className="goal-text">
          <h1>Goal</h1>
          <p>{goalDetails.goal}</p>
          <span>{goalDetails.category}</span>
        </div>
        <div className="details-container">
          <div className="detail">
            <h2>Motivations</h2>
            <p>{goalDetails.motivations}</p>
          </div>
          <div className="detail">
            <h2>Progress Milestones</h2>
            <p>{goalDetails.progressMilestones}</p>
          </div>
          <div className="detail">
            <h2>Accountability</h2>
            <p>{goalDetails.accountability}</p>
          </div>
        </div>
      </div>
      {/* <div className="goal-journal">
        <div className="goal-nav">
          <h2>Journal</h2>
          <a href="">Create New Page</a>
        </div>
        <div className="journal-pages">
          <JournalPage />
        </div>
      </div> */}
    </main>
  );
}

export default GoalDetail;
