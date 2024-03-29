import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom"

function GoalForm(props) {
  const { headerText, context, id } = props
  const { authUser } = context

  const [formValues, setFormValues] = useState({
    goal: "",
    motivations: "",
    progressMilestones: "",
    accountability: "",
    category: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const currentGoal = sessionStorage.getItem("currentGoal")

    if (currentGoal && headerText === "Edit Goal") {
      setFormValues(JSON.parse(currentGoal))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function validateForm(values) {
    let errors = {}
    if (!values.goal) {
      errors.goal = "Cannot leave goal blank"
    }

    if (!values.category) {
      errors.category = "Please select a category"
    }

    setErrors(errors)
    return errors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validate = validateForm(formValues)
    if (validate.goal || validate.category) {
      console.log({ errors: validate })
      setErrors(validate)
    } else {
      console.log("There are no errors!")
      if (headerText === "Create Goal") {
        context.data
          .createGoal(formValues, authUser)
          .then(data => {
            if (data) {
              if (data.name === "ValidationError") {
                console.log(data)
                setErrors(data.message)
              } else if (data.error) {
                console.log(data)
                setErrors({ error: data.message })
              } else {
                props.history.push("/notfound")
              }
            }
          })
          .then(async () => {
            const userGoals = await context.data
              .getGoals(authUser)
              .then(data => data)
              .catch(err => console.log(err))
            sessionStorage.setItem("goals", JSON.stringify(userGoals))

            props.history.push("/goals")
          })
          .catch(err => console.log(err))
      } else {
        sessionStorage.setItem("currentGoal", JSON.stringify(formValues))

        context.data
          .updateGoal(formValues, id, authUser)
          .then(async data => {
            if (!data) {
              const userGoals = await context.data
                .getGoals(authUser)
                .then(data => data)
                .catch(err => console.log(err))
              sessionStorage.setItem("goals", JSON.stringify(userGoals))

              props.history.push(`/goals/${id}`)
            } else if (data.message) {
              props.history.push("/notfound")
            }
          })
          .catch(err => {
            console.log(err)
            props.history.push("/errors")
          })
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <main>
      <h1>{headerText}</h1>
      <div className="goal-form">
        <div className="goal-guide">
          <h2>Guide</h2>
          <div className="guide-item">
            <h3>Goal:</h3>
            <p>
              Define your goal. If you’re feeling stuck, try using the S.M.A.R.T (Specific,
              Measurable, Attainable, Relevant, Time-based) method for inspiration.
            </p>
          </div>
          <div className="guide-item">
            <h3>Motivations:</h3>
            <p>Why is this goal important? What will you get out of achieving this goal?</p>
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
          <p className="form-description">
            Enter your goal details below: <br />
          </p>
          <span className="markdown-note">*Text fields that support markdown</span>

          <div className="validation-errors">
            <ul>
              {errors
                ? Object.values(errors).map((err, i) => {
                    return <li key={i}>{err}</li>
                  })
                : ""}
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
                value={formValues.goal}
              ></textarea>
            </p>
            <p>
              <label htmlFor="motivations">Motivations*</label>
              <textarea
                name="motivations"
                id="motivations"
                autoComplete="off"
                cols="30"
                rows="5"
                onChange={handleChange}
                value={formValues.motivations}
              ></textarea>
            </p>
            <p>
              <label htmlFor="progressMilestones">Progress Milestones*</label>
              <textarea
                name="progressMilestones"
                id="progressMilestones"
                autoComplete="off"
                cols="30"
                rows="5"
                onChange={handleChange}
                value={formValues.progressMilestones}
              ></textarea>
            </p>
            <p>
              <label htmlFor="accountability">Accountability*</label>
              <textarea
                name="accountability"
                id="accountability"
                autoComplete="off"
                cols="30"
                rows="5"
                onChange={handleChange}
                value={formValues.accountability}
              ></textarea>
            </p>
          </div>

          <p className="form-select">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={formValues.category}
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
          <div className="form-buttons">
            <button className="button" type="submit">
              Submit
            </button>
            {headerText === "Edit Goal" ? (
              <Link to={`/goals/${id}`}>Cancel</Link>
            ) : (
              <Link to="/goals">Cancel</Link>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export default withRouter(GoalForm)
