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
                <p><strong>Difficulty: {note.difficulty}</strong></p>
                <button>Edit</button>
                
                <form action="" className="comment-form">
                    <label htmlFor=""></label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <input type="submit" value='Submit Comment'/>
                </form>

            </div>

            <div className='comments-display'>

            </div>
        </div>
    )
}

export default NoteShow