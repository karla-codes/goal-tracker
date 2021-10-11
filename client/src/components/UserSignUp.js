import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

function UserSignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // track state for the following:
  // - form values (email, password, fullName)
  // - form errors
  //

  // Add form validation
  // Check if:
  // 1. email address is correct format (regex)
  // 2. email input is empty
  // 3. password input is empty
  // 4. password has min 8 characters (regex)

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
          Already have an account?Login <Link to="/">here</Link>!
        </p>
      </div>
    </main>
  );

  // handle input change

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
