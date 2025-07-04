import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../css/AddProduct.css";
import ajouter from "../assets/icons/ajouter.png";
import logoutImg from "../assets/icons/logout.png";
import { toast } from "react-toastify";


const AddProduct = () => {
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

  const ajouterProduit = async () => {
    const data = {
      nom,
      quantite: parseInt(quantite),
      prix: parseFloat(prix),
      categorie,
      image_url: imageUrl,
    };

    const res = await fetch("http://localhost:5000/ajouterGateau", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("✅ Produit ajouté avec succès !");
      setNom("");
      setQuantite("");
      setPrix("");
      setCategorie("");
      setImageUrl("");
    } else {
      toast.error("❌ Erreur lors de l'ajout du produit.");
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
          <p className="customLink1">Ajouter un produit</p>
          <Link  to={"/supprimerProduit"}>
            Supprimer un produit
          </Link>
          <Link  to={"/modifierProduit"}>
            Modifier un produit
          </Link>
        </div>
        <div className="deconnexion">
          <img src={logoutImg} alt="" />
          <h2 onClick={logout}>DECONNEXION</h2>
        </div>
      </div>

      <div className="rightContainerNavbar">
        <div className="topContainer">
          <img src={ajouter} alt="" />
          <h2>AJOUTER UN NOUVEAU PRODUIT</h2>
        </div>
        <div className="buttomContainer">
          <div className="imageProduit">
            <h2>IMAGE DU PRODUIT</h2>
            {imageUrl && <img src={imageUrl} alt="Produit" />}
            <input
              type="text"
              placeholder="URL de l'image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="informationGenerale">
            <h2>INFORMATION GENERALE</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ajouterProduit();
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
              <div className="rowInput">
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
              </div>
              <button type="submit">AJOUTER</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
