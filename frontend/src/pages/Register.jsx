import React ,{useState} from 'react'
import { Link , useNavigate } from "react-router-dom";
import "../css/Authentification.css"
import { useAuth } from "../context/AuthContext";
import backIcon from "../assets/icons/back.png"

const Register = () => {

  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (res.ok) {
      setMessage(result.message || "Compte créé avec succès !");
      setIsSuccess(true);

      // Après 2 secondes, redirige vers la page d'accueil
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setMessage(result.error || "Erreur lors de l'inscription.");
    }
  };

  return (
    <>
      <nav>
          <Link to="/"><img src={backIcon} alt="img/png" /></Link>
        </nav>
        <div className='mere'>
        <div className='loginContainer'>
          <div className='titleAuth'>
            <h1>MON GATEAU</h1>
          </div>
          <div className='inputs'>
            <form onSubmit={submit}>
              <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={handleChange}
              required
              disabled={isSuccess} // désactive la saisie si succès en cours
              />
              <input type="email" name='email' placeholder='email' onChange={handleChange} required disabled={isSuccess}/>
              <input type="password" name="password" placeholder='password' onChange={handleChange} required disabled={isSuccess}/>
              <button className='buttonLogin' type='submit' disabled={isSuccess}>Register</button>
              {message && (
              <p style={{ color: isSuccess ? "green" : "red" }}>{message}</p>
              )}
            </form>
          </div>
          <div className='register'>
            <Link to="/login">already have an account ? login</Link>
          </div>
        </div>
    </div>
    </>
  )
}

export default Register