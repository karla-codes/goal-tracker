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
import JournalPageDetail from './components/JournalPageDetail';
import EditGoal from './components/EditGoal';
import CreateGoal from './components/CreateGoal';

const UserSignInWithContext = withContext(UserSignIn);
const NavigationWithContext = withContext(Navigation);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  return (
    <BrowserRouter>
      <NavigationWithContext />
      <Switch>
        <Route exact path="/" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/goals/new" component={CreateGoal} />
        <Route
          path="/goals/:id/journal/:pageId"
          component={JournalPageDetail}
        />
        <Route path="/goals/:id/edit" component={EditGoal} />
        <Route path="/goals/:id" component={GoalDetail} />
        <Route path="/goals" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
