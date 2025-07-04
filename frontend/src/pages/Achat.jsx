import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";

const Achat = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  if (cart.length === 0) return <p>Votre panier est vide.</p>;

  return (
    <>
    <Navbar />
    <div className="cardContainer">
      <h2>Mon Panier</h2>
      <div className="cards-row">
        {cart.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image_url} alt={item.nom} />
            <h4>{item.nom}</h4>
            <p>Prix : {item.prix}DH</p>
            <p>Quantité : {item.quantity}</p>
            <p>Sous-total : {item.prix * item.quantity}DH</p>
          </div>
        ))}
      </div>
      <h3>Total : {getTotal()}DH</h3>
    </div>
    </>
  );
};

export default Achat;
