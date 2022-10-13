import { useEffect } from "react";
import { useCommentsContext } from '../hooks/useCommentsContext';
import { useAuthContext } from "../hooks/useAuthContext";

//components
import CommentDetails from "../components/Comment/CommentDetails";
import CommentForm from "../components/Comment/CommentForm";

const Comments = () => {
    // const [comments, setComments] = useState(null)
    const { comments, dispatch } = useCommentsContext()

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch('/api/comments', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // setComments(json)
                dispatch({type: 'SET_COMMENTS', payload: json})
            }
        }

        if (user) {
            fetchComments();
        }
        
    }, [dispatch, user])

    return (
        <div className="comments-page">
            <div className="comments">
                { comments && comments.map((comment) => (
                    <CommentDetails key={comment._id} comment={comment}/>
                ))}
            </div>
            <div>
                <CommentForm />
            </div>
        </div>
    )
}

export default Comments