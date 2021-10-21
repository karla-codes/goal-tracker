import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import PrivateRoute from './components/PrivateRoute';

const UserSignInWithContext = withContext(UserSignIn);
const NavigationWithContext = withContext(Navigation);
const UserSignOutWithContext = withContext(UserSignOut);
const DashboardWithContext = withContext(Dashboard);
const GoalDetailWithContext = withContext(GoalDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const DeleteGoalWithContext = withContext(DeleteGoal);
const CreateGoalWithContext = withContext(CreateGoal);
const EditGoalWithContext = withContext(EditGoal);
const PrivateRouteWithContext = withContext(PrivateRoute);

function App() {
  return (
    <BrowserRouter>
      <NavigationWithContext />
      <PrivateRouteWithContext>
        <Switch>
          <Route exact path="/" component={UserSignInWithContext} />
          <Route path="/goals/new" component={CreateGoalWithContext} />
          <Route path="/goals/:id/edit" component={EditGoalWithContext} />
          <Route path="/goals/:id/delete" component={DeleteGoalWithContext} />
          <Route exact path="/goals/:id" component={GoalDetailWithContext} />
          <Route path="/goals" component={DashboardWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/errors" component={Errors} />
          <Route path="/notfound" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </PrivateRouteWithContext>
    </BrowserRouter>
  );
}

export default App;
