// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from '../../context/AuthContext';
// <p>{formatDistanceToNow(new Date(note.createdAt), {addSuffix: true})}</p>

import { Link } from 'react-router-dom';

const NoteShow = () => {
    const { id } = useParams();

    const { user } = useAuthContext();
    
    const [note, setNote] = useState({});

    if (!user) {
        console.log('no user found!')
        return 'no user!'
    }

    useEffect(() => {
        const fetchNote = async () => {
            const response = await fetch(`/api/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(user.token);
            const json = await response.json()
            setNote(json)
        }
    
        fetchNote();
    }, [user])

    return (
        <div>
            <div className="note-show">
                <h4>{note.title}</h4>
                <h4>LeetCode Link: {note.link}</h4>
                <p><strong>Difficulty: {note.difficulty}</strong></p>
                <Link to={`/api/notes/${id}/edit`}>
                    <button>Edit</button>
                </Link>

            </div>
        </div>
    )
}

export default NoteShow