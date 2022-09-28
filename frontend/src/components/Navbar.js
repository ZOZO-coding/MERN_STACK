import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <header>
            <div className="container">
                <Link to='/api/notes'>
                    <h1>Leetcode Buddy</h1>
                </Link>
                <Link to='/api/comments'>
                    <h3>General Comments</h3>
                </Link>
            </div>
        </header>
     );
}
 
export default Navbar;