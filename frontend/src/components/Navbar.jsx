import "../css/Navbar.css"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };


  return (
    <div className="navbarContainer">
        <div className="titleNav">
            <h1>Mon gateau</h1>
        </div>
        <div className="links">
            <Link >favories</Link>
            <Link >achats</Link>
            <Link >explorer</Link>
            <Link >link</Link>
        </div>
        <div className="authentification">
            {user ? (
                <>
                    <div className="circle">
                        <span>{user.charAt(0).toUpperCase()}</span>    
                    </div>
                    <button onClick={handleLogout}>Déconnexion</button>
                </>
                ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </div>
    </div>
  )
}

export default Navbar