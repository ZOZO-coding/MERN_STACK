import { useParams } from "react-router-dom"
import { useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const NoteEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuthContext();

    const location = useLocation()
    const { note } = location.state

    // const [note, setNote] = useState({});
    const [title, setTitle] = useState(note.title)
    const [difficulty, setDifficulty] = useState(note.difficulty)
    const [link, setLink] = useState(note.link)
    // const [content, setContent] = useState(note.content)
    const [error, setError] = useState(null)


    // useEffect(() => {
    //     const fetchNote = async () => {
    //         const response = await fetch(`/api/notes/${id}`, {
    //             headers:{
    //                 'Authorization': `Bearer ${user.token}`
    //             }
    //         })
    //         const json = await response.json()
    //         setNote(json)
    //     }
    
    //     fetchNote();
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const note = {title, difficulty, link}

        const response = await fetch('/api/notes/' + id, {
            method: 'PATCH',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if(!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            // redirect to note show page
            setError(null)
            navigate('/api/notes/' + id)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Edit Note</h3>

            <label>Problem Title:</label>
            <input 
                type="text"
                onChange={(e) => {setTitle(e.target.value)}}
                // value={title} 
                defaultValue={note.title}
            />
            
            <label>Difficulty:</label>
            <input 
                type="text"
                onChange={(e) => {setDifficulty(e.target.value)}}
                // value={difficulty} 
                defaultValue={note.difficulty}
            />

            <label>Leetcode Link:</label>
            <input 
                type="text"
                onChange={(e) => {setLink(e.target.value)}}
                // value={link} 
                defaultValue={note.link}
            />

            {/* <label>Content:</label>
            <textarea 
                cols="30" 
                rows="10"
                onChange={(e) => {setContent(e.target.value)}}
                defaultValue={note.content}
            ></textarea> */}

            <button>Edit</button>
            {error && <div className="error">{error}</div>}
            
        </form>
    )
}

export default NoteEditForm