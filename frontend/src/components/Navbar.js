import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
    }

    return ( 
        <header>
            <div className="container">
                <Link to='/api/notes'>
                    <h1>Leetcode Buddy</h1>
                </Link>
                <Link to='/api/comments'>
                    <h3>General Comments</h3>
                </Link>
                <Link to='/api/todos'>
                    <h3>To Do List</h3>
                </Link>

                <nav>
                    <div>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                    <div>
                        <Link to='api/user/login'>Log In</Link>
                        <Link to='api/user/signup'>Sign Up</Link>
                    </div>
                </nav>
            </div>
        </header>
     );
}
 
export default Navbar;