import { createContext, useReducer } from 'react';

// create a comment context object
export const CommentsContext = createContext();

// the usage of context here, is to keep the front end page in sync with the back end databse, so instead of refetch everything when adding/deleting a comment, we create a context to keep the local state updated.

export const commentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return {
                comments: action.payload
            }
        case 'CREATE_COMMENT':
            return {
                comments: [action.payload, ...state.comments]
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter(comment => comment._id !== action.payload._id)
            }
        default:
            return state
    }
}

// create the context provider component, to wrap the app
export const CommentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(commentsReducer, {
        comments: null,
    })

    return (
        <CommentsContext.Provider value={{...state, dispatch}}>
            {children}
        </CommentsContext.Provider>
    )
}