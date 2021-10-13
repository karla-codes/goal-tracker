import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export const Provider = props => {
  // data that needs to be accessed by multiple components
  const [authUser, setAuthUser] = useState(null);

  // - Authenticated user
  // - api request helper
  // - setting/deleting cookies
  const data = new Data();

  const value = {
    // here goes the state that needs to be accessed thropugh context
    authUser,
    data,
    actions: {
      signIn,
      signOut,
    },
  };

  async function signIn(formValues) {
    const user = await data.getUser(formValues.email, formValues.password);
    console.log(user);
    if (user !== null) {
      setAuthUser(user);
      Cookies.set('authUser', JSON.stringify(user), { expires: 1 });
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
