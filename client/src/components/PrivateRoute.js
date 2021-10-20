import React from 'react';
import { Redirect, Route } from 'react-router';
import { Consumer } from '../Context';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props =>
            context.authUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{ pathname: '/', state: { from: props.location } }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
}

export default PrivateRoute;
