import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import DetailNav from './DetailNav';
import { useParams } from 'react-router';

function GoalDetail(props) {
  const { context } = props;
  const { actions, goalDetails } = context;
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

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
          <span className="goal-category">{goalDetails.category}</span>
        </div>
        {/* <div className="bulletin-board"> */}
        <div className="details-wrapper">
          <div className="detail">
            <div className="thumbtacks">
              <div className="thumbtack"></div>
              <div className="thumbtack-right"></div>
            </div>
            <h2>Motivations</h2>
            <p>
              <ReactMarkdown>{goalDetails.motivations}</ReactMarkdown>
            </p>
          </div>
          <div className="detail">
            <div className="thumbtacks">
              <div className="thumbtack"></div>
              <div className="thumbtack-right"></div>
            </div>
            <h2>Progress Milestones</h2>
            <p>
              <ReactMarkdown>{goalDetails.progressMilestones}</ReactMarkdown>
            </p>
          </div>
          <div className="detail">
            <div className="thumbtacks">
              <div className="thumbtack"></div>
              <div className="thumbtack-right"></div>
            </div>
            <h2>Accountability</h2>
            <p>
              <ReactMarkdown>{goalDetails.accountability}</ReactMarkdown>
            </p>
          </div>
        </div>
        {/* <div className="quote-wrapper">
          <h2>Motivational Quote Of The Day</h2>
          <div className="quote">
            <p>This is where the motivational quote will go.</p>
          </div>
        </div> */}
        {/* </div> */}
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
