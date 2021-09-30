import React from 'react';

function GoalDetail() {
  return (
    <main>
      <div className="goal-nav">
        <a href="">Back to Goals</a>
        <div>
          <a href="">Edit Goal Details</a>
          <a href="">Delete Goal</a>
        </div>
      </div>
      <div className="goal-details">
        <div className="goal">
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
        <div className="journal-pages">{/* <JournalEntry /> */}</div>
      </div>
    </main>
  );
}

export default GoalDetail;
