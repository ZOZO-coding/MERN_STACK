import { NotesContext } from "../context/NotesContext";
import { useContext } from "react";


// customized hook to return the context with useContext()
export const useNotesContext = () => {
    const context = useContext(NotesContext)

    if (!context) {
        throw Error('useNotesContext must be used inside an NoteContextProvider')
    }

    return context
}