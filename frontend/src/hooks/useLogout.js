import { useAuthContext } from "./useAuthContext"
import { useNotesContext } from "./useNotesContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const { dispatch: notesDispatch } = useNotesContext()

    // no need to send info to server
    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem('user')
        
        // dispatch a logout action
        dispatch({type: 'LOGOUT'})
        // clear the global state for the last logged user
        notesDispatch({type: 'SET_NOTES', payload: null})
    }

    return { logout }

}