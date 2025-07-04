import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "../../css/Navbar.css"
import Stars from "../../assets/icons/Stars.png"

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  const logout = async () => {
    const res = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      navigate("/");
    } else {
      alert("Erreur lors de la déconnexion");
    }
  };

  return (
    <div className='navbarContainer'>
        <div className='linksNav'>
            <Link to={"/favories"}>FAVORIS</Link>
            <Link to={"/achat"}>PANIER</Link>
            <Link to={"/personnaliser"}>PERSONNALISER</Link>
            <Link to={"/explorer"}>EXPLORER</Link>
        </div>
        <div className='logoNav'>
            <img src={Stars} alt="img/png" />
            <Link className="customLinkNav" to={"/"}>mon gateau</Link>
        </div>
        <div className='authNav'>
          {!isLoggedIn ? (
            <>
              <Link to="/connection">SE CONNECTER</Link>
              <Link to="/inscription">S'INSCRIRE</Link>
            </>
          ) : (
            <button onClick={logout}>SE DECONNECTER</button>
          )}
        </div>
    </div>
  )
}

export default Navbar