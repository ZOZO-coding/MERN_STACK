import { useState } from "react";
import { useTodosContext } from "../../hooks/useTodosContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import { BASE_URL } from "../BASE"

const TodoForm = () => {
    const { dispatch } = useTodosContext();

    const { user } = useAuthContext();

    const [item, setItem] = useState('')
    const [priority, setPriority] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!user) {
            return
        }

        // create a todo single item object
        const todo = {item, priority}
        
        // fetch the api to perform add todo list item
        const response = await fetch (`${BASE_URL}/api/todos`, {
            method: 'POST',
            // stringify the object into json string
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            console.log(error);
            setError(json.error)
        }

        if (response.ok) {
            // reset the form
            setItem('')
            setPriority('')
            dispatch({type: 'CREATE_TODO', payload: json})
        }

    }

    return (
        <form className="create-todo-form" onSubmit={handleSubmit}>
            <label style={{textAlign:'center'}}>Add a To-Do Item:</label>
            <input 
                type="text" 
                onChange={(e) => {setItem(e.target.value)}}
                value={item}
            />

            <fieldset style={{display: "flex"}} className="todo-priority">
                <legend>Priority</legend>

                <label style={{color:'red'}}>high</label>
                <input 
                    type="radio" 
                    id="high" 
                    name="priority"
                    onChange={(e) => {setPriority(e.target.value)}}
                    value='high'
                />

                <label style={{color:'purple'}}>mid</label>
                <input 
                    type="radio" 
                    id="mid" 
                    name="priority"
                    onChange={(e) => {setPriority(e.target.value)}}
                    value='mid'
                />

                <label style={{color:'green'}}>low</label>
                <input 
                    type="radio" 
                    id="low" 
                    name="priority"
                    onChange={(e) => {setPriority(e.target.value)}}
                    value='low'
                />
            </fieldset>

            <button style={{padding: '5px 20px'}}>Add</button>
        </form>
    )
}

export default TodoForm;