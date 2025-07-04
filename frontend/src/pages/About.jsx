import React from "react";
import "../css/About.css";
import facebookImg from "../assets/icons/facebook.png";
import instagramImg from "../assets/icons/instagram.png";
import gitImg from "../assets/icons/git.png";
import retourImg from '../assets/icons/back.png'
import {Link} from 'react-router-dom' 
import logoImage from "../assets/icons/gateauImgAuth.jpg";

export default function AboutUs() {
  return (
    <>
      <Link to={'/'}><img src={retourImg} alt="img/png" className="backImg" /></Link>
      <div className="about-wrapper">
        <header className="about-header">
          <h1>
            Qui sommes <span className="gold">nous</span> ?
          </h1>
          <p className="sub-title">
            Une équipe passionnée qui réinvente la pâtisserie en 3D.
          </p>
        </header>

        <section className="about-section">
          <div className="about-text">
            <h2>Notre Histoire</h2>
            <p>
              Lancé en 2025, <strong>mon gateau</strong> est né d'une idée simple : permettre à
              chacun de <span className="gold">créer</span> son propre gâteau 3D personnalisé, depuis chez soi.
              En combinant design, technologie et gourmandise, nous avons construit
              une plateforme unique.
            </p>

            <h2>Notre Mission</h2>
            <p>
              Offrir une expérience unique où chaque utilisateur peut imaginer,
              visualiser en 3D, puis commander son gâteau parfait. Le tout avec
              une interface intuitive et un rendu visuel appétissant.
            </p>
          </div>

          <div className="about-image">
            <img
              src={logoImage}
              alt="Gâteau personnalisé"
            />
          </div>
        </section>

        <section className="about-footer">
          <img src={facebookImg} alt="" />
          <img src={instagramImg} alt="" />
          <img src={gitImg} alt="" />
        </section>
      </div>
    </>
  );
}