import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

function UserSignIn() {
  // track state for:
  // - email
  // - password
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Add form validation
  // Check if:
  // 1. email address is correct format (regex)
  // 2. email input is empty
  // 3. password input is empty
  // 4. password has min 8 characters (regex)
  function formValidation(values) {
    let errors = {};
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!values.email) {
      errors.email = "Cannot leave blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Cannot leave blank";
    } else if (values.password.length < 8) {
      errors.password = "Password needs to be more than 8 characters long";
    }

    return errors;
  }

  /**
   * Handles input value change
   *
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(formValidation(formValues));
  }

  return (
    <main>
      <div className="form-wrapper">
        <h1>Login</h1>
        <Form
          submit={handleSubmit}
          buttonText="Login"
          elements={() => (
            <>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                id="email"
                type="email"
                onChange={handleChange}
              ></input>
              {errors.email}
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                id="password"
                type="password"
                onChange={handleChange}
              ></input>
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
