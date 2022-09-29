import { useEffect } from "react"
import { useTodosContext } from '../hooks/useTodosContext'

// components
import TodoForm from  '../components/Todos/TodoForm'

const Todos = () => {

    return (
        <div className="todos-page">

            <TodoForm />
        </div>
    )
}

export default Todos