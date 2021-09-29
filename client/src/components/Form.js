import React from 'react';

function Form(props) {
  const { elements, cancelButton, submit, buttonText } = props;

  return (
    <form onSubmit={submit}>
      {elements()}
      <button className="button" type="submit">
        {buttonText}
      </button>
      {cancelButton ? cancelButton : ''}
    </form>
  );
}

export default Form;