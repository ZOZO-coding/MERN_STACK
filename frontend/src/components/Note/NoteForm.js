import { useState } from "react";
import { useNotesContext } from "../../hooks/useNotesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import { BASE_URL } from "../BASE"

const NoteForm = () => {
    const { dispatch } = useNotesContext();

    const { user } = useAuthContext();

    const [title, setTitle] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [link, setLink] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
        }

        // create a dummy note object to send as the body of the request
        const note = {title, difficulty, link, content}

        // use the fetch api to send the post request:
        const response = await fetch(`${BASE_URL}/api/notes`, {
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
            setTitle('')
            setDifficulty('')
            setLink('')
            setError(null)
            setEmptyFields([])
            setContent('')
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
                className={(emptyFields).includes('title') ? 'error' : ''}
            />
            
            <label>Difficulty:</label>
            <select onChange={(e) => {setDifficulty(e.target.value)}} value={difficulty} >
                <option value="">Please choose a difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            <label>Leetcode Link:</label>
            <input 
                type="text"
                onChange={(e) => {setLink(e.target.value)}}
                value={link} 
                className={(emptyFields).includes('link') ? 'error' : ''}
            />

            <label>Content</label>
            <textarea 
                onChange={(e) => {setContent(e.target.value)}}
                value={content}
            >
            </textarea>

            <button>Add note</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default NoteForm;