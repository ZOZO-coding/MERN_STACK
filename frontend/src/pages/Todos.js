import { useEffect } from "react";
import { useTodosContext } from '../hooks/useTodosContext';
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TodoForm from '../components/Todos/TodoForm';
import TodoItem from '../components/Todos/TodoItem';

import { BASE_URL } from "../components/BASE"

const Todos = () => {
    const { todos, dispatch } = useTodosContext()

    const { user } = useAuthContext()

    useEffect(() => {
        // fetch all todo items
        const fetchTodos = async () => {
            const response = await fetch(`${BASE_URL}/api/todos`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // fire an action to the reducer to keep the front end state in sync
                dispatch({ type: 'SET_TODOS', payload: json })
            }
        }

        if (user) {
            fetchTodos()
        }

    }, [dispatch, user])

    return (
        <div className="todos-page">
            <div className="todos">
                {todos && todos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </div>

            <TodoForm />
        </div>
    )
}

export default Todos