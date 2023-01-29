import React, { useEffect, useState } from "react"
import Modal from "./Modal"

function Form(props) {
  const { elements, submit, buttonText } = props
  const [modal, setModal] = useState("")

  useEffect(() => {
    const modalOuter = document.querySelector(".modal-outer")
    setModal(modalOuter)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    modal.classList.remove("open")
  }

  return (
    <>
      {document.location.pathname === "/" ? <Modal handleSubmit={handleSubmit} /> : ""}

      <form onSubmit={submit}>
        {elements()}
        {/* Disable sign up for demo */}
        {buttonText === "Sign Up" ? (
          <>
            <button
              className="button disabled"
              type="submit"
              value={buttonText}
              name={buttonText}
              title="Account creation is disabled for demo purposes"
              disabled
            >
              {buttonText}
            </button>
            <div className="tooltip">
              <span className="tooltip-text">Account creation is disabled for demo purposes</span>
            </div>
          </>
        ) : (
          <button className="button" type="submit" value={buttonText} name={buttonText}>
            {buttonText}
          </button>
        )}
      </form>
    </>
  )
}

export default Form
