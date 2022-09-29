import { useEffect } from "react";
import { useTodosContext } from '../hooks/useTodosContext';

// components
import TodoForm from  '../components/Todos/TodoForm';
import TodoItem from '../components/Todos/TodoItem';

const Todos = () => {
    const { todos, dispatch } = useTodosContext()

    useEffect(() => {
        // fetch all todo items
        const fetchTodos = async () => {
            const response = await fetch('/api/todos')
            const json = await response.json()

            if (response.ok) {
                // fire an action to the reducer to keep the front end state in sync
                dispatch({type: 'SET_TODOS', payload: json})
            }
        }
        fetchTodos()
        
    }, [dispatch])

    return (
        <div className="todos-page">
            <div className="todos">
                {todos && todos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo}/>
                ))}
            </div>

            <TodoForm />
        </div>
    )
}

export default Todos