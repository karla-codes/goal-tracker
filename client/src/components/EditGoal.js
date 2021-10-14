import React from 'react';
import { useParams } from 'react-router';
import GoalForm from './GoalForm';

function EditGoal(props) {
  const { context } = props;
  const { id } = useParams();

  return <GoalForm headerText="Edit Goal" context={context} id={id} />;
}

export default EditGoal;
