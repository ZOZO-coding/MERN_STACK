import { useNotesContext } from "../hooks/useNotesContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// destructure the note from props in parent component Home, so you dont need to use props.note
const NoteDetails = ({ note }) => {
    const { dispatch } = useNotesContext();

    const handleClick = async () => {
        // delete the note from database
        const response = await fetch('/api/notes/' + note._id, {
            method: 'DELETE'
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
            <h4>{note.title}</h4>
            <p><strong>Difficulty: </strong>{note.difficulty}</p>
            <p><strong>Leetcode Link: </strong>{note.link}</p>
            <p>{formatDistanceToNow(new Date(note.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
     );
}
 
export default NoteDetails;