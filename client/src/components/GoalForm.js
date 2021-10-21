import React, { useEffect, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

function GoalForm(props) {
  const { headerText, context, id } = props;
  const { authUser, goalDetails } = context;

  const [formValues, setFormValues] = useState({
    goal: '',
    motivations: '',
    progressMilestones: '',
    accountability: '',
    category: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (goalDetails) {
      setFormValues(goalDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validateForm(values) {
    let errors = {};
    if (!values.goal) {
      errors.goal = 'Cannot leave goal blank';
    }

    if (!values.category) {
      errors.category = 'Please select a category';
    }

    setErrors(errors);
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validate = validateForm(formValues);
    console.log(validate);
    if (validate.goal || validate.category) {
      setErrors(validate);
    } else {
      console.log('There are no errors!');
      if (headerText === 'Create Goal') {
        context.data
          .createGoal(formValues, authUser)
          .then(data => {
            if (data) {
              console.log(data);
              if (data.name === 'ValidationError') {
                console.log(data);
                setErrors(data.message);
              } else if (data.error) {
                console.log(data);
                setErrors({ error: data.message });
              } else {
                props.history.push('/notfound');
              }
            } else {
              props.history.push('/goals');
            }
          })
          .catch(err => console.log(err));
      } else {
        context.data
          .updateGoal(formValues, id, authUser)
          .then(data => {
            if (!data) {
              props.history.push(`/goals/${id}`);
            } else if (data.message) {
              props.history.push('/notfound');
            }
          })
          .catch(err => {
            console.log(err);
            props.history.push('/errors');
          });
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <main>
      <div className="goal-form">
        <h1>{headerText}</h1>
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
          <p className="form-description">Enter your goal details below:</p>
          <div className="validation-errors">
            <ul>
              {errors
                ? Object.values(errors).map((err, i) => {
                    return <li key={i}>{err}</li>;
                  })
                : ''}
            </ul>
          </div>
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
                value={id ? formValues.goal : null}
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
                value={id ? formValues.motivations : null}
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
                value={id ? formValues.progressMilestones : null}
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
                value={id ? formValues.accountability : null}
              ></textarea>
            </p>
          </div>

          <p className="form-select">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={id ? formValues.category : null}
            >
              <option value="">Please choose an option</option>
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
            {headerText === 'Edit Goal' ? (
              <Link to={`/goals/${id}`}>Cancel</Link>
            ) : (
              <Link to="/goals">Cancel</Link>
            )}
          </p>
        </form>
      </div>
    </main>
  );
}

export default withRouter(GoalForm);
