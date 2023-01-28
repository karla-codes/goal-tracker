import React, { useEffect, useState } from "react"
import { Redirect, useParams } from "react-router"
import { Link } from "react-router-dom"

function DeleteGoal(props) {
  const { id } = useParams()
  const { context } = props
  const { authUser } = context
  const [goalId, setGoalId] = useState({})

  useEffect(() => {
    const currentGoal = sessionStorage.getItem("currentGoal")
    const goalId = JSON.parse(currentGoal)._id
    if (id === goalId) {
      setGoalId(goalId)
    }
  }, [id])

  function handleSubmit(e) {
    e.preventDefault()
    context.data
      .deleteGoal(id, authUser)
      .then(async () => {
        const userGoals = await context.data
          .getGoals(authUser)
          .then(data => data)
          .catch(err => console.log(err))
        sessionStorage.setItem("goals", JSON.stringify(userGoals))
      })
      .then(() => {
        props.history.push("/goals")
      })
      .catch(err => {
        console.log(err)
        props.history.push("/errors")
      })
  }

  if (goalId) {
    return (
      <main>
        <div className="delete-goal">
          <h1>Delete Goal</h1>
          <p>Are you sure you want to delete this goal?</p>

          <form className="delete-form" onSubmit={handleSubmit}>
            <button className="button" type="submit">
              Delete
            </button>
            <Link to={`/goals/${id}`}>Cancel</Link>
          </form>
        </div>
      </main>
    )
  } else {
    return <Redirect to="/notfound" />
  }
}

export default DeleteGoal
