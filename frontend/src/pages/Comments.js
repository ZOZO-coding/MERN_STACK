import { useEffect } from "react";
import { useCommentsContext } from '../hooks/useCommentsContext';

//components
import CommentDetails from "../components/Comment/CommentDetails";
import CommentForm from "../components/CommentForm";

const Comments = () => {
    // const [comments, setComments] = useState(null)
    const { comments, dispatch } = useCommentsContext()

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch('/api/comments')
            const json = await response.json()

            if (response.ok) {
                // setComments(json)
                dispatch({type: 'SET_COMMENTS', payload: json})
            }
        }
        fetchComments();
        
    }, [dispatch])

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