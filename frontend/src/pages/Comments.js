import { useState, useEffect } from "react";

const Comments = () => {
    const [comments, setComments] = useState(null)

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch('/api/comments')
            const json = await response.json()

            if (response.ok) {
                setComments(json)
            }
        }

        fetchComments();
    }, [])

    return (
        <div className="comments-container">
            <div className="comments">
                { comments && comments.map((comment) => (
                    <p key={comment._id}>{comment.body} -By {comment.username}</p>
                ))}
            </div>
        </div>
    )
}

export default Comments