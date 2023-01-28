import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import Form from "./Form"

function UserSignIn(props) {
  // track state for:
  // - email
  // - password
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})

  const { context } = props
  const { authUser } = context

  // Add form validation
  // Check if:
  // 1. email address is correct format (regex)
  // 2. email input is empty
  // 3. password input is empty
  // 4. password has min 8 characters (regex)
  function formValidation(values) {
    let errors = {}
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

    if (!values.email) {
      errors.email = "Cannot leave email blank"
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format"
    }

    if (!values.password) {
      errors.password = "Cannot leave password blank"
    } else if (values.password.length < 8) {
      errors.password = "Password needs to be more than 8 characters long"
    }

    setErrors(errors)
    return errors
  }

  /**
   * Handles input value change
   *
   */
  function handleChange(e) {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { from } = props.history.state || { from: "/goals" }
    const validate = formValidation(formValues)

    if (validate.email || validate.password) {
      setErrors(validate)
    } else {
      // run sign in functionality with API helper
      // - GET user request
      // - set cookies
      context.actions
        .signIn(formValues)
        .then(user => {
          if (user === null) {
            setErrors({ fetch: "Sign in was unsuccessfull" })
          } else {
            props.history.push(from)
          }
        })
        .catch(err => {
          console.log(err)
          props.history.push("/errors")
        })
    }
  }

  if (authUser) {
    return <Redirect to="/goals" />
  } else {
    return (
      <main>
        <div className="form-wrapper">
          <h1>Login</h1>
          <Form
            submit={handleSubmit}
            buttonText="Login"
            elements={() => (
              <>
                {errors.fetch && <span>{errors.fetch}</span>}
                <label htmlFor="email">Email:</label>
                <input name="email" id="email" type="email" onChange={handleChange}></input>
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
            Don't have an account? Sign up <Link to="/signup">here</Link>!
          </p>
        </div>
      </main>
    )
  }
}

export default UserSignIn
