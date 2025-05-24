import React , {useState , useEffect } from 'react'
import "../css/Card.css"
import { useAuth } from "../context/AuthContext";

const Card = () => {
    
    const [cakeArray , setCakeArray] = useState([]) 
    const [chargement , setChargement] = useState(true)
    const [error , setError] = useState(null)
    const { user } = useAuth();

    useEffect(() => {
        fetch('http://localhost:5000/cakes').then(
            (response) => {
                if(!response.ok){
                    throw new Error("Network response was not ok")
                }
                return response.json()
            }
        ).then((data) => {
            setCakeArray(data)
            setChargement(false)
        })
        .catch((error) => {
            setError(error.message)
            setChargement(false)
        })
    }, [])

    const handleBuy = (cakeId) => {
    if (!user) return alert("Veuillez vous connecter");
    fetch("http://localhost:5000/acheter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user, // À adapter selon la structure de l'utilisateur
        id_gateau: cakeId,
        quantite: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || data.error));
  };

  const handleAddFavorite = (cakeId) => {
    if (!user) return alert("Veuillez vous connecter");
    fetch("http://localhost:5000/favoris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user, // À adapter selon la structure de l'utilisateur
        id_gateau: cakeId,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || data.error));
  };

    if(chargement){
        return (
            <div className="spinner center">
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
            </div>
        )
    }
    if(error){
        return <p>{error}</p>
    }

  return (
    <div>
        <div className='card-container'>
            {cakeArray.map((cake , index) => (
                <div className='card' key={index}>
                    <img alt="img/jpg" />
                    <p>{cake.nom}</p>
                    <button  onClick={() => handleBuy(cake.id_gateau)}>
                    Acheter
                    </button>
                    <button  onClick={() => handleAddFavorite(cake.id_gateau)}>
                    Ajouter au favoris
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Card