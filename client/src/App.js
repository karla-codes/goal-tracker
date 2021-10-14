import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './style.css';

import withContext from './Context';

import Navigation from './components/Navigation';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Dashboard from './components/Dashboard';
import GoalDetail from './components/GoalDetail';
// import JournalPageDetail from './components/JournalPageDetail';
import EditGoal from './components/EditGoal';
import CreateGoal from './components/CreateGoal';
import DeleteGoal from './components/DeleteGoal';
import NotFound from './components/NotFound';
import Errors from './components/Errors';

const UserSignInWithContext = withContext(UserSignIn);
const NavigationWithContext = withContext(Navigation);
const UserSignOutWithContext = withContext(UserSignOut);
const DashboardWithContext = withContext(Dashboard);
const GoalDetailWithContext = withContext(GoalDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const DeleteGoalWithContext = withContext(DeleteGoal);
const CreateGoalWithContext = withContext(CreateGoal);
const EditGoalWithContext = withContext(EditGoal);

function App() {
  return (
    <BrowserRouter>
      <NavigationWithContext />
      <Switch>
        <Route exact path="/" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/goals/new" component={CreateGoalWithContext} />
        {/* <Route
          path="/goals/:id/journal/:pageId"
          component={JournalPageDetail}
        /> */}
        <Route path="/goals/:id/delete" component={DeleteGoalWithContext} />
        <Route path="/goals/:id/edit" component={EditGoalWithContext} />
        <Route path="/goals/:id" component={GoalDetailWithContext} />
        <Route path="/goals" component={DashboardWithContext} />
        <Route path="/errors" component={Errors} />
        <Route path="/notfound" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
