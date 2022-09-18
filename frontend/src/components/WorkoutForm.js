import { useState } from "react";

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault();

        // create a dummy workout object to send as the body of the request
        const workout = {title, load, reps}

        // use the fetch api to send the post request:
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body:JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            // reset the form
            setTitle('')
            setLoad('')
            setReps('')

            setError(null)
            console.log('new workout added');
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => {setTitle(e.target.value)}}
                value={title} 
            />
            
            <label>Load (in kg):</label>
            <input 
                type="text"
                onChange={(e) => {setLoad(e.target.value)}}
                value={load} 
            />

            <label>Reps:</label>
            <input 
                type="text"
                onChange={(e) => {setReps(e.target.value)}}
                value={reps} 
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default WorkoutForm;