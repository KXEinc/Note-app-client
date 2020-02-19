import React, { useState, useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";

export const Form = () => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
  const submitHandler = event => {
    event.preventDefault();
    if (value.trim()) {
      //TODO ...
      alert.show("Note has been created", "success");
      setValue('')
    } else {
      alert.show("Type the text!")
    }

  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your note"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </div>
    </form>
  );
};
