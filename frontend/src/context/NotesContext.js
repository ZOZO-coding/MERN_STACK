import { createContext, useReducer } from "react";

// create a context
export const NotesContext = createContext();

// keep the local state in sync with the database, not interacting with the database
// create reducer function
export const notesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return {
                notes: action.payload
            }
        case 'CREATE_NOTE':
            return {
                notes: [action.payload, ...state.notes]
            }
        case 'DELETE_NOTE':
            return {
                notes: state.notes.filter(note => note._id !== action.payload._id)
            }
        case 'UPDATE_NOTE':
            return {
                note: action.payload
            }
        default:
            return state
    }
}

// the children represents the <App /> we wrapped in index.js, same as props.children n
export const NotesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notesReducer, {
        notes: null,
        note: null
    })

    return (
        <NotesContext.Provider value={{...state, dispatch}}>
            { children }
        </NotesContext.Provider>
    )
} 