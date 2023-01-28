import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Goal from "./Goal"

function Dashboard(props) {
  const [goals, setGoals] = useState([])
  const { context } = props
  const { authUser, data } = context

  useEffect(() => {
    const fetchData = async () => {
      const userGoals = await data
        .getGoals(authUser)
        .then(data => data)
        .catch(err => console.log(err))
      sessionStorage.setItem("goals", JSON.stringify(userGoals))
      setGoals(userGoals)
    }
    fetchData()
    // const goals = sessionStorage.getItem("goals")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <div className="dashboard-info">
        <div>
          <h1>Dashboard</h1>
          <p>Select a goal to view/edit goal details.</p>
        </div>
        <Link to="/goals/new" className="link-button">
          Create New Goal
        </Link>
      </div>
      <div className="goal-container">
        {goals.map(goal => <Goal goal={goal} key={goal._id} />).reverse()}
      </div>
    </main>
  )
}

export default Dashboard
