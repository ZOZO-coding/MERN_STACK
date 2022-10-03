import { useTodosContext } from "../../hooks/useTodosContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const TodoItem = ({ todo }) => {
    const { dispatch } = useTodosContext()

    const { user } = useAuthContext()

    if (!user) {
        return
    }

    const handleClick = async() => {
        // first delete the todo item in the database
        const response = await fetch('/api/todos/' + todo._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        const json = await response.json();

        // sync with front end
        if (response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    // color display of todo items based on priority
    let color;
    if (todo.priority === 'high') {
        color = 'red'
    } else if (todo.priority === 'mid') {
        color = 'purple'
    } else {
        color = 'green'
    }

    // handle click function when the user clicks on an item to apply a line-through css style, indicating that the to do item is finished
    let checked = false;
    const handleItemClick = (e) => {
        // toggle the item with a line through
        checked = !checked;
        if (checked) {
            e.target.style.setProperty('text-decoration', 'line-through')
        } else {
            e.target.style.removeProperty('text-decoration')
        }
    }

    return (
        <div className="todo-details">
            <p 
                key={todo._id}
                style={{
                    color: color,
                }}
                onClick={handleItemClick}
            >
                {todo.item}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default TodoItem