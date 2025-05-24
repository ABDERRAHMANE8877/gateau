import React ,{useState} from 'react'
import { Link , useNavigate } from "react-router-dom";
import "../css/Authentification.css"
import { useAuth } from "../context/AuthContext";
import backIcon from "../assets/icons/back.png"


const Login = () => {

  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (res.ok) {
      login(result.user); // met à jour le contexte
      setTimeout(() => {
        navigate("/");
      }, 1000);
      navigate("/");
    } else {
      setMessage(result.error || "Erreur lors de la connexion.");
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
              <input type="email" name='email' placeholder='email' onChange={handleChange} required />
              <input type="password" name="password" placeholder='password' onChange={handleChange} required />
              <button className='buttonLogin' type='submit'>LOGIN</button>
              {message && <p style={{ color: "red" }}>{message}</p>}
            </form>
          </div>
          <div className='register'>
            <Link to="/register">don't have an account ? register</Link>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login