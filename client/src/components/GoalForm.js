import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

function GoalForm(props) {
  const { headerText, context, id } = props;
  const { authUser } = context;

  const [formValues, setFormValues] = useState({
    goal: '',
    motivations: '',
    progressMilestones: '',
    accountability: '',
    category: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchGoalDetails = async () => {
      // const goalDetails = await context.data.
    };
  });

  function validateForm(values) {
    let errors = {};
    if (!values.goal) {
      errors.goal = 'Cannot leave goal blank';
    }
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateForm(formValues));

    if (errors.goal) {
      return;
    } else {
      context.data
        .createGoal(formValues, authUser)
        .then(data => {
          if (data) {
            props.history.push('/notfound');
          } else {
            props.history.push('/goals');
          }
        })
        .catch(err => console.log(err));
    }
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

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
        <form onSubmit={handleSubmit}>
          <div className="form-textfields">
            <p>
              <label htmlFor="goal">Goal</label>
              <textarea
                name="goal"
                id="goal"
                autoComplete="off"
                cols="30"
                rows="5"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              ></textarea>
            </p>
          </div>

          <p>
            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="health">Health</option>
              <option value="finances">Finances</option>
              <option value="work">Work</option>
              <option value="relationships">Relationships</option>
              <option value="personal growth">Personal Growth</option>
              <option value="mindfulness">Mindfulness</option>
            </select>
          </p>
          <p>
            <button className="button" type="submit">
              Submit
            </button>
            <Link to="/goals">Cancel</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default withRouter(GoalForm);
