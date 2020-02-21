import React, { useReducer } from "react";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTES, SHOW_LOADER } from '../types'

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false
  };

  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchNotes = async () => {
    showLoader();
    const res = await fetch(`${url}/notes.json`).then(res => res.json());

    const payload = Object.keys(res).map(key => {
      return {
        ...res[key],
        id: key
      };
    });
    dispatch({
      type: FETCH_NOTES,
      payload
    });
  };

  const addNote = async title => {
    const note = {
      title,
      data: new Date().toJSON()
    };

    try {
      const res = await fetch(`${url}/notes.json`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(note)
      }).then(res => res.json());
      const payload = {
        ...note,
        id: res.name
      }

      dispatch({
        type: ADD_NOTE,
        payload
      })

    } catch (e) {
      throw new Error(e.message);
    }
  };

  const removeNote = async id => {
    await fetch(`${url}/notes/${id}.json`, { method: "DELETE" });

    dispatch({
      type: REMOVE_NOTES,
      payload: id
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        addNote,
        removeNote,
        fetchNotes,
        loading: state.loading,
        notes: state.notes
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
