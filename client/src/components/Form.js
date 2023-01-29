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

    // setClicks(clicks + 1)
    modal.classList.remove("open")
  }

  return (
    <>
      {document.location.pathname === "/" ? <Modal handleSubmit={handleSubmit} /> : ""}

      <form onSubmit={submit}>
        {elements()}
        <button className="button" type="submit" value={buttonText} name={buttonText}>
          {buttonText}
        </button>
      </form>
    </>
  )
}

export default Form
