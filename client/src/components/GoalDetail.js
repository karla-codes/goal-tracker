import React, { useEffect } from 'react';
// import JournalPage from './JournalPage';
import DetailNav from './DetailNav';
import { useParams } from 'react-router';

function GoalDetail(props) {
  const { context } = props;
  const { actions, goalDetails } = context;
  const { id } = useParams();

  useEffect(() => {
    const fetchGoals = async () => {
      const fetchGoalDetails = async () => {
        const goalDetails = await actions.getGoalDetails(id).then(data => {
          if (data.message) {
            props.history.push('/notfound');
          }
        });

        return goalDetails;
      };
      fetchGoalDetails();
    };

    fetchGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
