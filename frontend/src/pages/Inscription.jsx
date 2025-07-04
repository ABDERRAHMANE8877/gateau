import React from 'react'
import { useState } from "react";
import {Link , useNavigate } from "react-router-dom";
import backImg from "../assets/icons/back.png"
import "../css/Connection.css"
import gateauImgAuth from "../assets/icons/gateauImgAuth.jpg"

const Inscription = () => {
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

        navigate("/");

    } else {
      setMessage(result.error || "Erreur lors de l'inscription.");
    }
  };
  return (


    <>
    
          <div className='connectionContainer'>
          <Link to={"/"}><img src={backImg} alt="img/png" className='backImg' /></Link>
            <div className='leftContainerConn'>
              <h1>Inscription</h1>
              <form onSubmit={submit}>

                <input
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  onChange={handleChange}
                  required
                />


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
    
                <button type='submit'>s'inscrire</button>
              </form>
    
              {message && <p style={{ color: "red" }}>{message}</p>}
    
              <Link to={"/connection"}>Vous avez deja un compte ? <span className='customSpanConn'>Se connecter</span></Link>
            </div>
            <div className='rightContainerConn'>
                <img src={gateauImgAuth} alt="" />
            </div>
          </div>
    </>
  )
}

export default Inscription