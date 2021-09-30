import React from 'react';
import Goal from './Goal';

function GoalForm(props) {
  const { headerText } = props;
  return (
    <main>
      <h1>{headerText}</h1>
      <div className="goal-form-container">
        <div className="goal-guide">
          <h2>Guide</h2>
          <div className="guide-item">
            <h3>Goal:</h3>
            <p>
              Define your goal. If you’re stuck, use the S.M.A.R.T (Specific,
              Measurable, Attainable, Relevant, Time-based) method to get some
              inspiration
            </p>
          </div>
          <div className="guide-item">
            <h3>Motivations:</h3>
            <p>
              Why is this goal important? What will you get out of achieving
              this goal?
            </p>
          </div>
          <div className="guide-item">
            <h3>Progress Milestones:</h3>
            <p>These should be clear, trackable, and measurable objectives.</p>
          </div>
          <div className="guide-item">
            <h3>Accountability:</h3>
            <p>How will you hold yourself accountable?</p>
          </div>
        </div>
        <form>
          <div className="form-textfields">
            <p>
              <label htmlFor="goal">Goal</label>
              <textarea
                name="goal"
                id="goal"
                autoComplete="off"
                cols="30"
                rows="5"
              ></textarea>
            </p>
            <p>
              <label htmlFor="motivations">Motivations</label>
              <textarea
                name="motivations"
                id="motivations"
                autoComplete="off"
                cols="30"
                rows="5"
              ></textarea>
            </p>
            <p>
              <label htmlFor="progress-milestones">Progress Milestones</label>
              <textarea
                name="progress-milestones"
                id="progress-milestones"
                autoComplete="off"
                cols="30"
                rows="5"
              ></textarea>
            </p>
            <p>
              <label htmlFor="accountability">Accountability</label>
              <textarea
                name="accountability"
                id="accountability"
                autoComplete="off"
                cols="30"
                rows="5"
              ></textarea>
            </p>
          </div>

          <p>
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value="health">Health</option>
              <option value="finances">Finances</option>
              <option value="work">Work</option>
              <option value="relationships">Relationships</option>
              <option value="personal growth">Personal Growth</option>
              <option value="mindfulness">Mindfulness</option>
            </select>
          </p>
          <p>
            <button>Submit</button>
            <button>Cancel</button>
          </p>
        </form>
      </div>
    </main>
  );
}

export default GoalForm;
