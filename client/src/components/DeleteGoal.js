import React from 'react';
import { useParams } from 'react-router';

function DeleteGoal(props) {
  const { id } = useParams();
  const { context } = props;
  const { authUser } = context;

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

  function cancel() {
    props.history.push(`/goals/${id}`);
  }

  return (
    <main>
      <div className="delete-goal">
        <h1>Delete Goal</h1>
        <p>Are you sure you want to delete this goal?</p>

        <form onSubmit={handleSubmit}>
          <button className="cancel-btn button" onClick={cancel}>
            Cancel
          </button>
          <button className="delete-btn button" type="submit">
            Delete
          </button>
        </form>
      </div>
    </main>
  );
}

export default DeleteGoal;
