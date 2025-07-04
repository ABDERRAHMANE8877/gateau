import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import "../css/AddProduct.css";
import logoutImg from "../assets/icons/logout.png";
import modifyImg from "../assets/icons/modify.png";

const ModifieProduct = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  const [nom, setNom] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

  const modifierProduit = async () => {
    if (
      !nom.trim() ||
      !quantite ||
      !prix ||
      !categorie.trim() ||
      !imageUrl.trim()
    ) {
      toast.error("⚠️ Veuillez remplir tous les champs.");
      return;
    }

    const data = {
      nom,
      quantite: parseInt(quantite),
      prix: parseFloat(prix),
      categorie,
      image_url: imageUrl,
    };

    const res = await fetch("http://localhost:5000/modifierProduit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("✅ Produit modifié avec succès !");
    } else if (res.status === 404) {
      toast.error("❌ Produit non trouvé.");
    } else {
      toast.error("❌ Erreur lors de la modification.");
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
          <Link to={"/supprimerProduit"}>Supprimer un produit</Link>
          <p className="customLink1">Modifier un produit</p>
        </div>
        <div className="deconnexion">
          <img src={logoutImg} alt="logout" />
          <h2 onClick={logout}>DECONNEXION</h2>
        </div>
      </div>

      <div className="rightContainerNavbar">
        <div className="topContainer">
          <img src={modifyImg} alt="" />
          <h2>MODIFIER UN PRODUIT PAR NOM</h2>
        </div>
        <div className="buttomContainer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              modifierProduit();
            }}
          >
            <input
              type="text"
              placeholder="Nom du produit"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantité"
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
            />
            <input
              type="number"
              placeholder="Prix"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL de l'image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button className="modifierButton" type="submit">MODIFIER</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifieProduct;
