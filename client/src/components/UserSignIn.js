import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

function UserSignIn() {
  return (
    <main>
      <div className="form-wrapper">
        <h1>Login</h1>
        <Form
          submit=""
          buttonText="Login"
          elements={() => (
            <>
              <label htmlFor="email">Email:</label>
              <input name="email" id="email" type="email"></input>
              <label htmlFor="password">Password:</label>
              <input name="password" id="password" type="password"></input>
            </>
          )}
        />
        <p>
          Don't have an account? Sign up <Link to="/signup">here</Link>!
        </p>
      </div>
    </main>
  );
}

export default UserSignIn;
