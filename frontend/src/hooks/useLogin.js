import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { BASE_URL } from "../components/BASE"

// create a custom hook for signup
export const useLogin = () => {
    const [error, setError] = useState(null)
    // the loading state is used to, for exmple, when signing up, the submit button will be disabled to prevent multiple actions
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${BASE_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'https://leetcode-study.onrender.com',
                'Access-Control-Allow-Methods':'*'
            },
            body: JSON.stringify({email, password})
        })
        // it the request is successfully processed, json is going to be the json web token
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // store the token in the browser (to localStorage), why stringify, because we have to store strings in localStorage
            localStorage.setItem('user', JSON.stringify(json))
            // update the AuthContext with the user we get back from the server
            dispatch({type: 'LOGIN', payload: json})
            // update the loading state back to false
            setIsLoading(false)
        }
    }
    return { login, isLoading, error } 

}