import { useState } from "react"
import { useSignup } from "../hooks/useSignup"


const Signup = () => {
    // use states to keep track what user is typing in the forms
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // from the signup cutomized hook
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <p>It may take up to 30 seconds for the server to response, please be patient...</p>

            <label>Email:</label>
            <input 
                type="email"
                onChange={e => {setEmail(e.target.value)}} 
                value={email}
            />

            <label>Password:</label>
            <input 
                type="password"
                onChange={e => {setPassword(e.target.value)}} 
                value={password}
            />

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup