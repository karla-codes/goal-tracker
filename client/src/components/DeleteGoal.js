import React from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';

function DeleteGoal(props) {
  const { id } = useParams();
  const { context } = props;
  const { authUser, goalDetails } = context;

  function handleSubmit(e) {
    e.preventDefault();
    context.data
      .deleteGoal(id, authUser)
      .then(() => props.history.push('/goals'))
      .catch(err => {
        console.log(err);
        props.history.push('/errors');
      });
  }

  if (id === goalDetails._id) {
    return (
      <main>
        <div className="delete-goal">
          <h1>Delete Goal</h1>
          <p>Are you sure you want to delete this goal?</p>

          <form onSubmit={handleSubmit}>
            <button className="button" type="submit">
              Delete
            </button>
            <Link to={`/goals/${id}`}>Cancel</Link>
          </form>
        </div>
      </main>
    );
  } else {
    return <Redirect to="/notfound" />;
  }
}

export default DeleteGoal;
