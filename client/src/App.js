import './style.css';

import Navigation from './components/Navigation';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import Dashboard from './components/Dashboard';
import GoalDetail from './components/GoalDetail';
import JournalPageDetail from './components/JournalPageDetail';
import EditGoal from './components/EditGoal';
import CreateGoal from './components/CreateGoal';

function App() {
  return (
    <>
      <Navigation />
      {/* <Dashboard /> */}
      {/* <JournalPageDetail /> */}
      {/* <GoalDetail /> */}
      <UserSignIn />
      {/* <UserSignUp /> */}
      {/* <EditGoal /> */}
    </>
  );
}

export default App;
