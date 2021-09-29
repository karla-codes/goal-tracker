import React from 'react';
import Form from './Form';

function UserSignIn() {
  return (
    <main>
      <div className="form-wrapper">
        <h1>Sign In</h1>
        <Form
          submit=""
          buttonText="Sign In"
          elements={() => (
            <>
              <label htmlFor="email">Email:</label>
              <input name="email" id="email" type="email"></input>
              <label htmlFor="password">Password:</label>
              <input name="password" id="password" type="password"></input>
            </>
          )}
        />
        <div>
          <p>
            Don't have an account? Sign up <a href="">here</a>!
          </p>
        </div>
      </div>
    </main>
  );
}

export default UserSignIn;
