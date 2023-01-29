import React from "react"

function Modal(props) {
  const { handleSubmit } = props

  return (
    <div className="modal-outer open">
      <div className="modal-inner ">
        <p>
          Hello! Welcome to Goal Pad! I've set up a demo account for anyone interested in checking
          out the app. You can sign in using email: <strong>demo@email.com</strong> and password:{" "}
          <strong>password</strong>. You'll be able to view sample goals and create/edit/delete your
          own goals.
        </p>
        <button
          className="submit-modal button"
          type="submit"
          name="exit-modal"
          onClick={handleSubmit}
        >
          Sounds good
        </button>
      </div>
    </div>
  )
}

export default Modal
