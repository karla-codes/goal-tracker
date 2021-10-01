import React, { useState } from 'react';

import Form from './Form';

function UserSignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main>
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <Form
          submit={submit}
          cancel={cancel}
          buttonText="Sign Up"
          elements={() => (
            <>
              <label htmlFor="fullName">Full Name:</label>
              <input name="fullName" id="fullName" type="text"></input>
              <label htmlFor="email">Email:</label>
              <input name="email" id="email" type="email"></input>
              <label htmlFor="password">Password:</label>
              <input name="password" id="password" type="password"></input>
            </>
          )}
        />
        <p>
          Already have an account?Login <a href="">here</a>!
        </p>
      </div>
    </main>
  );

  function submit() {
    // save input values into object
    // send request to REST API to create a new user
    // if any validation errors occur, display errors
    // else login user and take to last page visited || user dashboard
  }

  function cancel(e) {
    e.preventDefault();
    // return to login page
    // props.history.push('/login')
  }
}

export default UserSignUp;
