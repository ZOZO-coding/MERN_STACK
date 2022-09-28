import { CommentsContext } from "../context/CommentsContext";
import { useContext } from "react";


// customized hook to return the context with useContext()
export const useCommentsContext = () => {
    const context = useContext(CommentsContext)

    if (!context) {
        throw Error('useCommentsContext must be used inside an CommentsContextProvider')
    }

    return context
}