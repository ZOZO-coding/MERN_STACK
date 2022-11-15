import { useNotesContext } from "../../hooks/useNotesContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from 'react';

import Model from '../Modal/Modal';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { BASE_URL } from "../BASE"

// destructure the note from props in parent component Home, so you dont need to use props.note
const NoteDetails = ({ note }) => {
    const { dispatch } = useNotesContext();
    const { user } = useAuthContext();

    // create a state to show the modal of confirming page when deleting
    const [openModel, setOpenModal] = useState(false)

    if (!user) {
        return
    }

    const handleDelete = async () => {
        // delete the note from database
        const response = await fetch(`${BASE_URL}/api/notes/` + note._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
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
            <span className="material-symbols-outlined" onClick={() => setOpenModal(true)}>delete</span>
            {openModel && <Model setOpenModal={setOpenModal} handleDelete={handleDelete} />}
        </div>
     );
}
 
export default NoteDetails;