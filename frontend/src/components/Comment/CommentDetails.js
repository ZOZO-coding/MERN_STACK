import { useCommentsContext } from "../../hooks/useCommentsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { BASE_URL } from "../BASE"


const CommentDetails = ({ comment }) => {
    const { dispatch } = useCommentsContext()
    const { user } = useAuthContext();

    if (!user) {
        return
    }

    const handleClick = async () => {
        // delete the comment
        const response = await fetch(`${BASE_URL}/api/comments/` + comment._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Access-Control-Allow-Origin':'https://leetcode-study.onrender.com',
                'Access-Control-Allow-Methods':'*'
            }
        })
        
        const json = await response.json();

        // after successfully updated the databse, we sync with the front end state
        if (response.ok) {
            dispatch({type: 'DELETE_COMMENT', payload: json})
        }
    }

    return (
        <div className="comment-details">
            <blockquote>
                <p key={comment._id}>{comment.body}</p>
            </blockquote>
            <div>
                <p>By - {comment.username}</p>
                <p>{formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true})}</p>    
            </div>
            
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}

export default CommentDetails