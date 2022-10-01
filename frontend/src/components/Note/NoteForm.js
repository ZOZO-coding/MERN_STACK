import { useState } from "react";
import { useNotesContext } from "../../hooks/useNotesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const NoteForm = () => {
    const { dispatch } = useNotesContext();

    const { user } = useAuthContext();

    const [title, setTitle] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [link, setLink] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
        }

        // create a dummy note object to send as the body of the request
        const note = {title, difficulty, link}

        // use the fetch api to send the post request:
        const response = await fetch('/api/notes', {
            method: 'POST',
            // stringify changes the note object to a json string
            body:JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        // why this line? because we are getting json back from our server route
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            // reset the form
            setEmptyFields([])
            setError(null)
            setTitle('')
            setDifficulty('')
            setLink('')
            dispatch({type: 'CREATE_NOTE', payload: json})
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Note</h3>

            <label>Problem Title:</label>
            <input 
                type="text"
                onChange={(e) => {setTitle(e.target.value)}}
                value={title} 
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            
            <label>Difficulty:</label>
            <input 
                type="text"
                onChange={(e) => {setDifficulty(e.target.value)}}
                value={difficulty} 
                className={emptyFields.includes('difficulty') ? 'error' : ''}
            />

            <label>Leetcode Link:</label>
            <input 
                type="text"
                onChange={(e) => {setLink(e.target.value)}}
                value={link} 
                className={emptyFields.includes('link') ? 'error' : ''}
            />

            <button>Add note</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default NoteForm;