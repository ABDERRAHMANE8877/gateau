import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import "../css/AddProduct.css";
import logoutImg from "../assets/icons/logout.png";
import deleteImg from "../assets/icons/delete.png";

const DeleteProduct = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  const [nom, setNom] = useState("");

  const logout = async () => {
    const res = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      navigate("/");
    } else {
      alert("Erreur lors de la déconnexion");
    }
  };

  const supprimerProduit = async () => {
    if (!nom.trim()) {
      toast.error("⚠️ Veuillez saisir le nom du produit à supprimer.");
      return;
    }

    const res = await fetch("http://localhost:5000/supprimerProduit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom }),
    });

    if (res.ok) {
      toast.success("✅ Produit supprimé avec succès !");
      setNom("");
    } else if (res.status === 404) {
      toast.error("❌ Produit non trouvé.");
    } else {
      toast.error("❌ Erreur lors de la suppression.");
    }
  };

  return (
    <div className="navbarAdminContainer">
      <div className="sideBar">
        <div className="titre">
          <h1>mon gateau</h1>
        </div>
        <div className="linksProductManagement">
          <h2>GESTION DE PRODUIT</h2>
          <Link to={"/ajouterProduit"}>Ajouter un produit</Link>
          <p className="customLink1">Supprimer un produit</p>
          <Link to={"/modifierProduit"}>Modifier un produit</Link>
        </div>
        <div className="deconnexion">
          <img src={logoutImg} alt="logout" />
          <h2 onClick={logout}>DECONNEXION</h2>
        </div>
      </div>

      <div className="rightContainerNavbar">
        <div className="topContainer">
          <img src={deleteImg} alt="" />
          <h2>SUPPRIMER UN PRODUIT PAR NOM</h2>
        </div>
        <div className="buttomContainer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              supprimerProduit();
            }}
          >
            <input
              type="text"
              placeholder="Nom du produit"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <button className="deleteButton" type="submit">SUPPRIMER</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
