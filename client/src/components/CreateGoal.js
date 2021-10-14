import React from 'react';
import GoalForm from './GoalForm';

function CreateGoal(props) {
  const { context } = props;
  return <GoalForm headerText="Create Goal" context={context} />;
}

export default CreateGoal;
