import React from 'react';
import JournalPage from './JournalPage';
import DetailNav from './DetailNav';

function GoalDetail() {
  return (
    <main>
      <DetailNav />
      <div className="goal-details">
        <div className="goal-text">
          <h1>Goal</h1>
          <p>This is where the goal goes</p>
          <span>Tag</span>
        </div>
        <div className="details-container">
          <div className="detail">
            <h2>Motivations</h2>
            <p>Enter user filled text</p>
          </div>
          <div className="detail">
            <h2>Progress Milestones</h2>
            <p>Enter user filled text</p>
          </div>
          <div className="detail">
            <h2>Accountability</h2>
            <p>Enter user filled text</p>
          </div>
        </div>
      </div>
      <div className="goal-journal">
        <div className="goal-nav">
          <h2>Journal</h2>
          <a href="">Create New Page</a>
        </div>
        <div className="journal-pages">
          <JournalPage />
        </div>
      </div>
    </main>
  );
}

export default GoalDetail;
