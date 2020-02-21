import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTES, SHOW_LOADER } from "../types";

const handlers = {
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [ADD_NOTE]: (state, { payload }) => ({
    ...state,
    notes: [...state.notes, payload]
  }),
  [FETCH_NOTES]: (state, { payload }) => ({
    ...state,
    loading: false,
    notes: payload
  }),
  [REMOVE_NOTES]: (state, { payload }) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== payload)
  }),
  DEFAULT: state => state
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
