import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return ( 
        <header>
            <div className="container">
                <Link to='/api/notes'>
                    <h1 style={{color: '#f9a825'}}>Zoey Coding</h1>
                </Link>
                <Link to='/api/comments'>
                    <h3>General Comments</h3>
                </Link>
                <Link to='/api/todos'>
                    <h3>To Do List</h3>
                </Link>

                <nav>
                    {/* if user signed in, do display the log out option */}
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log Out</button>
                        </div>
                    )}
                    {/* if no user signed in, display the login and signup options */}
                    {!user && (
                        <div>
                        <Link to='api/user/login'>Log In</Link>
                        <Link to='api/user/signup'>Sign Up</Link>
                        </div>
                    )}
                    
                </nav>
            </div>
        </header>
     );
}
 
export default Navbar;