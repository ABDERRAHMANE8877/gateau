from flask import Flask, request, jsonify
from flask_cors import CORS
from services import *

app = Flask(__name__)
CORS(app)  

@app.route('/cakes' , methods=['GET'])
def cakes():
    cakes = get_all_cakes()
    if cakes is not None : 
        return jsonify(cakes)
    else :
        return jsonify({"error": "No cakes found"}), 404

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    if create_user(username, email, password):
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
        return jsonify({"message": "Login successful","user": {"id": user["id"],  "username": user["username"]}}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/acheter", methods=["POST"])
def acheter():
    data = request.get_json()
    user_id = data.get("user_id")
    id_gateau = data.get("id_gateau")
    quantite = data.get("quantite")

    if not user_id or not id_gateau or not quantite:
        return jsonify({"error": "Champs manquants"}), 400

    result, status = acheter_gateau(user_id, id_gateau, quantite)
    return jsonify(result), status


@app.route("/favoris", methods=["POST"])
def favoris():
    data = request.get_json()
    user_id = data.get("user_id")
    id_gateau = data.get("id_gateau")

    if not user_id or not id_gateau:
        return jsonify({"error": "Champs manquants"}), 400

    result, status = ajouter_favori(user_id, id_gateau)
    return jsonify(result), status


@app.route("/favoris/<int:user_id>", methods=["GET"])
def get_user_favoris(user_id):
    favoris = get_favoris(user_id)
    if favoris is not None:
        return jsonify(favoris)
    else:
        return jsonify({"error": "Aucun favori trouvé"}), 404

@app.route("/favoris", methods=["DELETE"])
def delete_favori():
    data = request.get_json()
    user_id = data.get("user_id")
    id_gateau = data.get("id_gateau")

    if not user_id or not id_gateau:
        return jsonify({"error": "Champs manquants"}), 400

    result, status = retirer_favori(user_id, id_gateau)
    return jsonify(result), status


if __name__ == "__main__":
    app.run(debug=True)

