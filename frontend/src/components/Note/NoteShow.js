// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from '../../hooks/useAuthContext';

import { Link } from 'react-router-dom';

import { BASE_URL } from "../BASE"

const NoteShow = () => {
    const { id } = useParams();

    const { user } = useAuthContext();

    const [note, setNote] = useState({});

    if (!user) {
        console.log('no user found!')
        // return 'no user!'
    }

    useEffect(() => {
        const fetchNote = async () => {
            const response = await fetch(`${BASE_URL}/api/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Access-Control-Allow-Origin': 'https://leetcode-study.onrender.com',
                    'Access-Control-Allow-Methods': '*'
                }
            })
            const json = await response.json()
            setNote(json)
        }

        fetchNote();
    }, [user, id])

    return (

        <div className="note-show">
            <h4>{note.title}</h4>
            <h4>LeetCode Link: <a href={note.link} target="_blank" rel="noreferrer" >{note.link}</a></h4>
            <p><strong>Difficulty: {note.difficulty}</strong></p>
            <div>
                Tips: {note.content}
            </div>
            {/* <p>{formatDistanceToNow(new Date(note.createdAt), {addSuffix: true})}</p> */}
            <Link to={`/api/notes/${id}/edit`} state={note} className="edit-button">
                <button>Edit</button>
            </Link>
        </div>

    )
}

export default NoteShow