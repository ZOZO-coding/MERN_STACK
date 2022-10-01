import { useEffect } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import NoteDetails from '../components/Note/NoteDetails'
import NoteForm from "../components/Note/NoteForm";

const Home = () => {
    const { notes, dispatch } = useNotesContext()

    // get the user from auth context
    const { user } = useAuthContext()

    // only fire once when page first renders
    useEffect(() => {
        const fetchNotes = async () => {
            // add authorization header
            const response = await fetch('/api/notes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_NOTES', payload: json})
            }
        }

        if (user) {
            fetchNotes();
        }
        
    }, [dispatch, user])

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