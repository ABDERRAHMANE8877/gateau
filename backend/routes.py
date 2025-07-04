from flask import Flask, request, jsonify
from flask_cors import CORS
from services import *
import jwt
import datetime
from dotenv import load_dotenv
import os


app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])  

load_dotenv()
app.secret_key = os.getenv('SECRET_KEY')
SECRET_KEY = app.secret_key

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role" , "client")

    if not username or not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    if create_user(username, email, password , role):
        return jsonify({"message": "User created successfully"}), 201

    return jsonify({"error": "User already exists or invalid data"}), 400

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = authenticate_user(email, password)
    if user:
        # Génération du token
        payload = {
            "user_id": user["id"], # type: ignore
            "username": user["username"], # type: ignore
            "role": user["role"], # type: ignore
        }

        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": user["username"], # type: ignore
            "role": user["role"] # type: ignore
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401

from flask import session, jsonify

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  # supprime toutes les données de session
    return jsonify({"message": "Déconnexion réussie"}), 200

@app.route("/getAllCakes", methods=["GET"])
def get_all_cakes_route():
    cakes = get_all_cakes()
    return jsonify(cakes), 200

from services import ajouter_gateau

@app.route("/ajouterGateau", methods=["POST"])
def ajouter_gateau_route():
    data = request.get_json()
    
    nom = data.get("nom")
    quantite = data.get("quantite")
    prix = data.get("prix")
    categorie = data.get("categorie")
    image_url = data.get("image_url")

    if not nom or not quantite or not prix or not categorie or not image_url:
        return jsonify({"error": "Champs manquants"}), 400

    success = ajouter_gateau(categorie, nom, quantite, prix, image_url)

    if success:
        return jsonify({"message": "Gâteau ajouté avec succès"}), 201
    else:
        return jsonify({"error": "Échec de l'ajout"}), 500


@app.route("/supprimerProduit", methods=["POST"])
def supprimer_produit():
    data = request.get_json()
    nom = data.get("nom")

    if not nom:
        return jsonify({"error": "Nom du produit requis"}), 400

    deleted_count = supprimer_gateau_par_nom(nom)

    if deleted_count > 0:
        return jsonify({"message": "Produit supprimé avec succès"}), 200
    else:
        return jsonify({"error": "Produit non trouvé"}), 404
    
@app.route("/modifierProduit", methods=["POST"])
def modifier_produit():
    data = request.get_json()
    nom = data.get("nom")
    quantite = data.get("quantite")
    prix = data.get("prix")
    categorie = data.get("categorie")
    image_url = data.get("image_url")

    # Vérification des champs essentiels
    if not nom:
        return jsonify({"error": "Nom du produit requis"}), 400

    if quantite is None or prix is None or not categorie or not image_url:
        return jsonify({"error": "Tous les champs doivent être renseignés"}), 400

    modified_count = modifier_gateau_par_nom(nom, quantite, prix, categorie, image_url)

    if modified_count > 0:
        return jsonify({"message": "Produit modifié avec succès"}), 200
    else:
        return jsonify({"error": "Produit non trouvé ou aucune modification"}), 404

if __name__ == "__main__":
    app.run(debug=True)
