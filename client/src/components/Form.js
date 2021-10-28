import React from 'react';

function Form(props) {
  const { elements, submit, buttonText } = props;

  return (
    <form onSubmit={submit}>
      {elements()}
      <button
        className="button"
        type="submit"
        value={buttonText}
        name={buttonText}
      />
    </form>
  );
}

export default Form;
