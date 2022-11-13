import { useNotesContext } from "../../hooks/useNotesContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { BASE_URL } from "../BASE"

// destructure the note from props in parent component Home, so you dont need to use props.note
const NoteDetails = ({ note }) => {
    const { dispatch } = useNotesContext();
    const { user } = useAuthContext();

    if (!user) {
        return
    }

    const handleClick = async () => {
        // delete the note from database
        const response = await fetch(`${BASE_URL}/api/notes/` + note._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Access-Control-Allow-Origin':'https://leetcode-study.onrender.com',
                'Access-Control-Allow-Methods':'*'
            }
        })
        // json would be the reponse we just deleted
        const json = await response.json();

        // fire a dispatch of action type delete
        if (response.ok) {
            dispatch({type: 'DELETE_NOTE', payload: json})
        }
    }

    return ( 
        <div className="note-details">
            <Link to={'/api/notes/' + note._id} state={note} className="note-title">
                <h4>{note.title}</h4>
            </Link>
            <p><strong>Difficulty: </strong>{note.difficulty}</p>
            <p><strong>Leetcode Link: </strong>{note.link}</p>
            <p>{formatDistanceToNow(new Date(note.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
     );
}
 
export default NoteDetails;