import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return { user: action.payload }
        }
        case 'LOGOUT': {
            return { user: null}
        }
        default: {
            return state
        }
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    })

    useEffect(() => {
        // parse the json string into an object, this user will have the email and token property
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    console.log('AuthContext state: ', state)

    return (
        // if we dont use spread operator here, for future reference, if we need to pass multiple properties inside state, we can use user: state.user inside value
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}