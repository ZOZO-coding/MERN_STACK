import { useEffect, useState } from "react";
import { useCommentsContext } from '../hooks/useCommentsContext';
import { useAuthContext } from "../hooks/useAuthContext";

//components
import CommentDetails from "../components/Comment/CommentDetails";
import CommentForm from "../components/Comment/CommentForm";
import CommentPagination from "../components/CommentPagination";

const Comments = () => {
    // const [comments, setComments] = useState(null)
    const { comments, dispatch } = useCommentsContext()
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`/api/comments?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // setComments(json)
                dispatch({ type: 'SET_COMMENTS', payload: json.comments })
                setPageCount(json.totalPages)
            }
        }

        if (user) {
            fetchComments();
        }

    }, [dispatch, user, page])

    return (
        <div className="comment-container">
            <div className="comments-page">
                <div className="comments">
                    {comments && comments.map((comment) => (
                        <CommentDetails key={comment._id} comment={comment} />
                    ))}
                </div>
                <div>
                    <CommentForm />
                </div>
            </div>

            <CommentPagination page={page} pageCount={pageCount} setPage={setPage} setPageCount={setPageCount} />
        </div>
    )
}

export default Comments