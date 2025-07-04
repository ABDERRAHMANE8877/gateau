import Navbar from '../components/Navbar/Navbar.jsx'
import Hero from '../components/Navbar/Hero.jsx'
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  // Redirection automatique si déjà connecté
  useEffect(() => {
    if (isLoggedIn) {
      if (role === "admin") navigate("/admin");
      else if (role === "patissier") navigate("/patissier");
      else if (role === "client") navigate("/");
    }
  }, [isLoggedIn, role, navigate]);

  return (
    <div>
        <Navbar />
        <Hero />
    </div>
  )
}

export default Home