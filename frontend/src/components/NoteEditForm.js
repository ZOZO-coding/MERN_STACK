import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

const NoteEditForm = () => {
    const { id } = useParams();

    const [note, setNote] = useState({});
    const [title, setTitle] = useState(note.title)
    const [difficulty, setDifficulty] = useState(note.difficulty)
    const [link, setLink] = useState(note.link)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchNote = async () => {
            const response = await fetch(`/api/notes/${id}`)
            const json = await response.json()
            setNote(json)
        }
    
        fetchNote();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const note = {title, difficulty, link}

        const response = await fetch('/api/notes/' + id, {
            method: 'PATCH',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if(!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            // redirect to note show page
            setError(null)
            
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

            <button>Edit</button>
        </form>
    )
}

export default NoteEditForm