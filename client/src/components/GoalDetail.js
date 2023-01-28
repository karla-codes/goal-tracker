import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import DetailNav from "./DetailNav"
import { useParams } from "react-router"

function GoalDetail(props) {
  const [currentGoal, setCurrentGoal] = useState({})

  // const { context } = props
  // const { actions, goalDetails } = context
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)

    const currentGoal = sessionStorage.getItem("currentGoal")
    setCurrentGoal(JSON.parse(currentGoal))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <DetailNav goalId={id} goalDetails={currentGoal} />
      <div className="goal-details">
        <div className="goal-text">
          <h1>Goal</h1>
          <p>{currentGoal.goal}</p>
          <span className="goal-category">{currentGoal.category}</span>
        </div>
        <div className="details-wrapper">
          <div className="detail">
            <div className="thumbtacks">
              <div className="thumbtack"></div>
              <div className="thumbtack-right"></div>
            </div>
            <h2>Motivations</h2>
            <ReactMarkdown>{currentGoal.motivations}</ReactMarkdown>
          </div>
          <div className="detail">
            <div className="thumbtacks">
              <div className="thumbtack"></div>
              <div className="thumbtack-right"></div>
            </div>
            <h2>Progress Milestones</h2>
            <ReactMarkdown>{currentGoal.progressMilestones}</ReactMarkdown>
          </div>
          <div className="detail">
            <div className="thumbtacks">
              <div className="thumbtack"></div>
              <div className="thumbtack-right"></div>
            </div>
            <h2>Accountability</h2>
            <ReactMarkdown>{currentGoal.accountability}</ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GoalDetail
