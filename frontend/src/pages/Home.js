import { useState, useEffect } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import NoteDetails from '../components/Note/NoteDetails'
import Pagination from "../components/Pagination";
import Filter from "../components/Note/Filter";

import { BASE_URL } from "../components/BASE"

const Home = () => {

    const { notes, dispatch } = useNotesContext()

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const [difficulty, setDifficulty] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    // get the user from auth context
    const { user } = useAuthContext()

    // submit for search term
    const handleSubmit = endpoint => e => {
        e.preventDefault()

        setSearchTerm(endpoint)
    }

    // only fire once when page first renders
    useEffect(() => {
        const fetchNotes = async () => {
            // add authorization header
            const response = await fetch(`${BASE_URL}/api/notes?page=${page}&searchTerm=${searchTerm}&difficulty=${difficulty}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Access-Control-Allow-Origin':'https://leetcode-study.onrender.com',
                    'Access-Control-Allow-Methods':'*'
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

    }, [dispatch, user, page, searchTerm, difficulty])

    return (
        <div className="home-container">
            <div className="home">
                <div className="notes">
                    {notes && notes.map((note) => (
                        <NoteDetails key={note._id} note={note} />
                    ))}
                </div>
                {/* replace this h3 with a filter component */}
                <div>
                    <Filter difficulty={difficulty} setDifficulty={setDifficulty} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSubmit={handleSubmit}/>
                </div>

            </div>

            <Pagination page={page} pageCount={pageCount} setPage={setPage} setPageCount={setPageCount} />
        </div>
    )
}

export default Home;