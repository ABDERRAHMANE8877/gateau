import React, { useState } from 'react'
import '../css/Connection.css'
import { Link, useNavigate } from 'react-router-dom'
import backImg from "../assets/icons/back.png"
import gateauImgAuth from "../assets/icons/gateauImgAuth.jpg"

const Connecter = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    setMessage("")

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json()
    if (res.ok) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', result.role); 
      if (result.role === "admin") navigate("/admin");
      else if (result.role === "patissier") navigate("/patissier");
      else navigate("/");
    } else {
      setMessage(result.error || "Erreur lors de la connexion. Réessayez.");
    }
  }

  return (
    <>
      <div className='connectionContainer'>
        <Link to={"/"}><img src={backImg} alt="img/png" className='backImg' /></Link>
        <div className='leftContainerConn'>
          <h1>Connection</h1>
          <form onSubmit={submit}>
            <input
              type="email"
              name="email"
              placeholder='Email'
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder='Password'
              onChange={handleChange}
              required
            />
            
            <button type='submit'>se connecter</button>
          </form>

          {message && <p style={{ color: "red" }}>Email ou mot de passe incorrect</p>}

          <Link to={"/inscription"}>Vous n'avez pas de compte ? <span className='customSpanConn'>S'inscrire</span></Link>
        </div>
        <div className='rightContainerConn'>
          <img src={gateauImgAuth} alt="" />
        </div>
      </div>
    </>
  )
}

export default Connecter
