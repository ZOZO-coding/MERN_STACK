import { useEffect } from "react";
import { useNotesContext } from "../hooks/useNotesContext";

// components
import NoteDetails from '../components/Note/NoteDetails'
import NoteForm from "../components/Note/NoteForm";

const Home = () => {
    const { notes, dispatch } = useNotesContext()

    // only fire once when page first renders
    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('/api/notes')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_NOTES', payload: json})
            }
        }

        fetchNotes();
    }, [dispatch])

    return (
        <div className="home">
            <div className="notes">
                {notes && notes.map((note) => (
                    <NoteDetails key={note._id} note={note} />
                ))}
            </div>
            <NoteForm />
        </div>
    )
}

export default Home;