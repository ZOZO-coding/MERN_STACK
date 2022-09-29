import { TodosContext } from "../context/TodosContext";
import { useContext } from "react";

// cutomized hook to return the TodosContext
export const useTodosContext = () => {
    const context = useContext(TodosContext)

    if (!context) {
        throw Error('useTodosContext must be used inside an TodosContextProvider')
    }

    return context
}