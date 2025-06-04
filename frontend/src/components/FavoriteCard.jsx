import React, { useState, useEffect } from 'react';
import '../css/Favorites.css';
import Confirmation from './Confirmation.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


const TestFavorites = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const [favorites, setFavorites] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedGateauId, setSelectedGateauId] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false); // <-- pour gérer les deux cas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // Récupération des favoris
  useEffect(() => {
    fetch(`http://localhost:5000/favoris/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error loading favorites");
        return response.json();
      })
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Fonction de suppression
  const confirmRemove = () => {
    if (confirmClearAll) {
      // Supprimer tous les favoris
      Promise.all(favorites.map((cake) =>
        fetch("http://localhost:5000/favoris", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, id_gateau: cake.id_gateau }),
        })
      ))
        .then(() => {
          setFavorites([]);
          setShowConfirm(false);
          setConfirmClearAll(false);
        })
        .catch((err) => alert("Error deleting all: " + err.message));
    } else {
      // Supprimer un seul favori
      fetch("http://localhost:5000/favoris", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, id_gateau: selectedGateauId }),
      })
        .then((res) => res.json())
        .then(() => {
          setFavorites(favorites.filter((cake) => cake.id_gateau !== selectedGateauId));
          setShowConfirm(false);
        })
        .catch((err) => alert("Error deletion: " + err.message));
    }
  };

  // Quand on clique sur 🗑️ d’un seul gâteau
  const handleRemove = (id_gateau) => {
    setSelectedGateauId(id_gateau);
    setConfirmClearAll(false); // <-- Important !
    setShowConfirm(true);
  };

  // Quand on clique sur "Clear all favorites"
  const handleClearFavorites = () => {
    setSelectedGateauId(null); // Aucun gâteau spécifique
    setConfirmClearAll(true); // <-- Active le mode suppression totale
    setShowConfirm(true);
  };

  if (loading) return <p>Loading...</p>;
if (error) return <p style={{ color: 'red' }}>{error}</p>;

if (favorites.length === 0) {
  return (
    <div className="favorites-page empty">
      <h2>No favorites yet</h2>
      <p>
        You haven't added any cakes to your favorites yet. Browse our catalog and add your favorite cakes to this list.
      </p>
      <button className="discover-button" onClick={() => navigate('/')}>
        🍰 Discover our cakes
      </button>
    </div>
  );
}


  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <div>
          <h2 className="favorites-title">My Favorite Cakes</h2>
          <p className="favorites-subtitle">Find all your favorite cakes here</p>
        </div>
        <div className="favorites-actions">
          <div className="favorites-count">❤️ {favorites.length} favorites</div>
          <button className="clear-button" onClick={handleClearFavorites}>
            🗑️ Clear all favorites
          </button>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        ← Return 
      </button>

      <div className="favorites-grid">
        {favorites.map((cake) => (
          <div key={cake.id_gateau} className="cake-card">
            <div className="cake-top">{cake.nom}</div>
            <div
              className="cake-image"
              style={{
                  backgroundImage: `url("https://placehold.co/300x180?text=${encodeURIComponent(cake.nom)}")`
              }}
            ></div>
            <div className="cake-content">
              <h3>{cake.nom}</h3>
              <p className="cake-favori">⭐ Favorite</p>
              <span className="cake-price">{parseFloat(cake.prix).toFixed(2)} DH</span>
              <button onClick={() => handleRemove(cake.id_gateau)} className="remove-button">
                ❤️ Remove from favorites
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fenêtre de confirmation */}
      <Confirmation
        isOpen={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setConfirmClearAll(false);
        }}
        onConfirm={confirmRemove}
        title="Confirmation"
        message={
          confirmClearAll
            ? "Are you sure you want to delete all your favorite cakes? This action cannot be undone."
            : "Are you sure you want to delete this cake from your favorites?"
        }
      />
    </div>
  );
};

export default TestFavorites;
