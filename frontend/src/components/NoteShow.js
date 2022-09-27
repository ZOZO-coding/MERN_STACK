// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// <p>{formatDistanceToNow(new Date(note.createdAt), {addSuffix: true})}</p>

const NoteShow = () => {
    const { id } = useParams();
    
    const [note, setNote] = useState({});

    useEffect(() => {
        const fetchNote = async () => {
            const response = await fetch(`/api/notes/${id}`)
            const json = await response.json()
            setNote(json)
        }
    
        fetchNote();
    }, [])

    return (
        <div>
            <div className="note-show">
                <h4>{note.title}</h4>
                <h4>LeetCode Link: {note.link}</h4>
                <p><strong>Difficulty: {note.difficulty}</strong></p>
                <button>Edit</button>

            </div>

            <div className='comments-display'>
                
            </div>
        </div>
    )
}

export default NoteShow