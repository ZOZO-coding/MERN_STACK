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

    return (
        <div className="todo-details">
            <p key={todo._id}>{todo.item}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default TodoItem