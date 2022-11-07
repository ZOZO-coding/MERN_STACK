import { useState, useEffect } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import NoteDetails from '../components/Note/NoteDetails'
import Pagination from "../components/Pagination";

const Home = () => {
    const { notes, dispatch } = useNotesContext()

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    // get the user from auth context
    const { user } = useAuthContext()

    // only fire once when page first renders
    useEffect(() => {
        const fetchNotes = async () => {
            // add authorization header
            const response = await fetch(`/api/notes?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_NOTES', payload: json.notes })
                setPageCount(json.totalPages)
            }
        }

        if (user) {
            fetchNotes();
        }

    }, [dispatch, user, page])

    return (
        <div>
            <div className="home">
                <div className="notes">
                    {notes && notes.map((note) => (
                        <NoteDetails key={note._id} note={note} />
                    ))}
                </div>
                {/* <NoteForm /> */}
                <h3>Add Filter</h3>
            </div>

            <Pagination page={page} pageCount={pageCount} setPage={setPage} setPageCount={setPageCount} />
        </div>
    )
}

export default Home;