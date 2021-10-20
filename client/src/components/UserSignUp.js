import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

function UserSignUp(props) {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const { context } = props;

  // track state for the following:
  // - form values (email, password, fullName)
  // - form errors

  // Add form validation
  // Check if:
  // 1. email address is correct format (regex)
  // 2. email input is empty
  // 3. password input is empty
  // 4. password has min 8 characters (regex)
  function formValidation(values) {
    let errors = {};
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!values.fullName) {
      errors.fullName = 'Cannot leave name blank';
    }

    if (!values.email) {
      errors.email = 'Cannot leave email blank';
    } else if (!regex.test(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.password) {
      errors.password = 'Cannot leave password blank';
    } else if (values.password.length < 8) {
      errors.password = 'Password needs to be more than 8 characters long';
    }

    return errors;
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { from } = props.history.state || { from: '/goals' };
    setErrors(formValidation(formValues));

    if (errors.fullName || errors.email || errors.password) {
      return;
    } else {
      // send user sign up request
      context.data
        .createUser(formValues)
        .then(errors => {
          if (errors) {
            setErrors({ email: errors });
          } else {
            console.log(
              `${formValues.fullName} is successfully signed up and authenticated!`
            );
            context.actions.signIn(formValues).then(user => {
              console.log(user);
              if (user === null) {
                setErrors({ fetch: 'Sign in was unsuccessfull' });
              } else {
                props.history.push(from);
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          props.history.push('/errors');
        });
    }
  }

  return (
    <main>
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <Form
          submit={handleSubmit}
          buttonText="Sign Up"
          elements={() => (
            <>
              <label htmlFor="fullName">Full Name:</label>
              <input
                name="fullName"
                id="fullName"
                type="text"
                onChange={handleChange}
              ></input>
              {errors.fullName && <span>{errors.fullName}</span>}
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                id="email"
                type="email"
                onChange={handleChange}
              ></input>
              {errors.email && <span>{errors.email}</span>}
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                id="password"
                type="password"
                onChange={handleChange}
              ></input>
              {errors.password && <span>{errors.password}</span>}
            </>
          )}
        />
        <p>
          Already have an account? Login <Link to="/">here</Link>!
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
