import { useCommentsContext } from "../hooks/useCommentsContext";

const CommentDetails = ({ comment }) => {
    const { dispatch } = useCommentsContext()

    const handleClick = async () => {
        // delete the comment
        const response = await fetch('/api/comments/' + comment._id, {
            method: 'DELETE'
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
            </div>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}

export default CommentDetails