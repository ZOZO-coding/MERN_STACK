import { useState } from "react"
import { useCommentsContext } from "../../hooks/useCommentsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import { BASE_URL } from "../BASE"


const CommentForm = () => {
    const { dispatch } = useCommentsContext();
    const { user } = useAuthContext();

    const [body, setBody] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null)

    if (!user) {
        return
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // create a dummy comment object to send as the body of the request
        const comment = {username, body}

        // use the fetch api to send the post request:
        const response = await fetch(`${BASE_URL}/api/comments`, {
            method: 'POST',
            // stringify changes the note object to a json string to meet the body requirement
            body:JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                'Access-Control-Allow-Origin':'https://leetcode-study.onrender.com',
                'Access-Control-Allow-Methods':'*'
            }
        })
        // now through the server, we are getting a json back, so we need to use .json()
        const json = await response.json();

        // sanity check
        if (!response.ok) {
            console.log(error)
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

                <label>Name</label>
                <input 
                    type="text"
                    value={username}
                    onChange={e => {setUsername(e.target.value)}} 
                    required
                />
                
                <label>Comment</label>
                <textarea 
                    cols="20" 
                    rows="5"
                    value={body}
                    onChange={e => {setBody(e.target.value)}}
                    required>
                </textarea>

                <button>Post Your Comment</button>

            </form>
        </div>
    )
}

export default CommentForm