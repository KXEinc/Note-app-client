import React, { useState, useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = event => {
    event.preventDefault();
    if (value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => alert.show("Note has been created", "success"))
        .catch(() => alert.show("Opps! Something is wrong =(", "danger"));
      setValue("");
    } else {
      alert.show("Type the text!");
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
