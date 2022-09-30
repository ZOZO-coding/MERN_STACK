import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()

    // no need to send info to server
    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem('user')
        
        // dispatch a logout action
        dispatch({type: 'LOGOUT'})
    }

    return { logout }

}