import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Card.css";
import heartImg from "../assets/icons/heart.png";
import heartRedImg from "../assets/icons/heart-red.png";

const Card = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem("favorites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/getAllCakes")
      .then((response) => {
        setCakes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des gâteaux :", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = (cake) => {
    const isAlreadyFav = favorites.some((fav) => fav.id === cake.id);
    if (isAlreadyFav) {
      setFavorites(favorites.filter((fav) => fav.id !== cake.id));
    } else {
      setFavorites([...favorites, cake]);
    }
  };

  const addToCart = (cake) => {
    const existing = cart.find((item) => item.id === cake.id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === cake.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...cake, quantity: 1 }]);
    }
  };

  const groupedByCategory = cakes.reduce((groups, cake) => {
    const category = cake.categorie || "Autre";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(cake);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="spinner center">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="spinner-blade" />
        ))}
      </div>
    );
  }

  return (
    <div className="cardContainer">
      {Object.entries(groupedByCategory).map(([category, cakes]) => (
        <div key={category} className="category-row">
          <h2>{category.toUpperCase()}</h2>
          <div className="cards-row">
            {cakes.map((cake) => {
              const isFavorite = favorites.some((fav) => fav.id === cake.id);
              return (
                <div key={cake.id} className="card">
                  <img src={cake.image_url} alt={cake.nom} />
                  <h4>{cake.nom}</h4>
                  <h4 className="price">{cake.prix}DH</h4>
                  <div className="rowButton">
                    <button onClick={() => addToCart(cake)}>
                      Ajouter au panier
                    </button>
                    <button
                      className="heart"
                      onClick={() => toggleFavorite(cake)}
                    >
                      <img
                        src={isFavorite ? heartRedImg : heartImg}
                        alt="heart"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
