import React, { useEffect, useState } from "react";
import "../css/Card.css"; // Pour garder le même style
import Navbar from "../components/Navbar/Navbar.jsx";

const Favories = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  if (favorites.length === 0) {
    return <p>Aucun gâteau en favori.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="favouriteContainer">
        <div className="cardContainer">
        <h2 >Mes Favoris</h2>
        <div className="cards-row">
          {favorites.map((cake) => (
            <div key={cake.id} className="card">
              <img src={cake.image_url} alt={cake.nom} />
              <h4>{cake.nom}</h4>
              <h4 className="price">{cake.prix}DH</h4>
              
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Favories;
