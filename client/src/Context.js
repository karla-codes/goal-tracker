import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export const Provider = props => {
  // data that needs to be accessed by multiple components

  // - Authenticated user
  // - api request helper
  // - setting/deleting cookies
  const cookie = Cookies.get('authUser');
  const data = new Data();

  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
  const [goalDetails, setGoalDetails] = useState({});

  const value = {
    // here goes the state that needs to be accessed thropugh context
    authUser,
    goalDetails,
    data,
    actions: {
      signIn,
      signOut,
      getGoalDetails,
    },
  };

  async function getGoalDetails(goalId) {
    const goalDetails = await data
      .getGoal(goalId, authUser)
      .then(data => {
        if (data.status === 404) {
          return { error: data.message };
        } else {
          return data;
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      });

    setGoalDetails(goalDetails);
    return goalDetails;
  }

  async function signIn(formValues) {
    const user = await data.getUser(formValues.email, formValues.password);
    if (user !== null) {
      user.password = formValues.password;
      setAuthUser(user);
      Cookies.set('authUser', JSON.stringify(user), {
        expires: 1,
      });
    }
    return user;
  }

  async function signOut() {
    // set authUser back to null
    setAuthUser(null);
    // remove cookies
    Cookies.remove('authUser');
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const Consumer = Context.Consumer;

function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}

export default withContext;
