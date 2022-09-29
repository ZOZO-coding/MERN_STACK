import { useState } from "react"
import { useCommentsContext } from "../hooks/useCommentsContext";


const CommentForm = () => {
    const { dispatch } = useCommentsContext();

    const [body, setBody] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // create a dummy comment object to send as the body of the request
        const comment = {username, body}

        // use the fetch api to send the post request:
        const response = await fetch('/api/comments', {
            method: 'POST',
            // stringify changes the note object to a json string to meet the body requirement
            body:JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // now through the server, we are getting a json back, so we need to use .json()
        const json = await response.json();

        // sanity check
        if (!response.ok) {
            setError(json.error) // from the server setup
        }

        // if response is ok, rest the form
        if (response.ok) {
            setError(null)
            setBody('')
            setUsername('')

            //dispatch the action
            dispatch({type: 'CREATE_COMMENT', payload: json})
        }
    }


    return (

        <div>
            <form className="comment-form" onSubmit={handleSubmit}>
                <h3>Leave Your Daily Comment</h3>

                <label>Username</label>
                <input 
                    type="text"
                    value={username}
                    onChange={e => {setUsername(e.target.value)}} 
                />

                <textarea 
                    cols="30" 
                    rows="10"
                    value={body}
                    onChange={e => {setBody(e.target.value)}}>
                </textarea>

                <button>Post Your Comment</button>

            </form>
        </div>
    )
}

export default CommentForm