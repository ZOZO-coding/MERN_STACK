import { useState } from "react";
import { useTodosContext } from "../../hooks/useTodosContext";

const TodoForm = () => {
    const { dispatch } = useTodosContext();

    const [item, setItem] = useState('')
    const [priority, setPriority] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault();

        // create a todo single item object
        const todo = {item, priority}
        
        // fetch the api to perform add todo list item
        const response = await fetch ('/api/todos', {
            method: 'POST',
            // stringify the object into json string
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (!response.ok) {
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
            <label>To Do Item:</label>
            <input 
                type="text" 
                onChange={(e) => {setItem(e.target.value)}}
                value={item}
            />

            <fieldset style={{display: "flex"}}>
                <legend>Priority</legend>

                <label>high</label>
                <input 
                    type="radio" 
                    id="high" 
                    name="priority"
                    onChange={(e) => {setPriority(e.target.value)}}
                    value='high'
                />

                <label>mid</label>
                <input 
                    type="radio" 
                    id="mid" 
                    name="priority"
                    onChange={(e) => {setPriority(e.target.value)}}
                    value='mid'
                />

                <label>low</label>
                <input 
                    type="radio" 
                    id="low" 
                    name="priority"
                    onChange={(e) => {setPriority(e.target.value)}}
                    value='low'
                />
            </fieldset>

            <button>Add</button>
        </form>
    )
}

export default TodoForm;