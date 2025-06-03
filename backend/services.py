from dal import get_connection
import mysql.connector
import mysql.connector.connection
import bcrypt

def get_all_cakes():
    conn = get_connection()
    if conn : 
        try : 
            cursor = conn.cursor(dictionary=True) # type: ignore
            cursor.execute("SELECT * FROM gateau")
            results = cursor.fetchall()
            return results
        finally :
            cursor.close()
            conn.close()
    else : 
        return None

def create_user(username, email, password):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True) # type: ignore


    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)",
                       (username, email, password_hash.decode('utf-8')))
        conn.commit() # type: ignore
        return True
    except Exception as e:
        print("Error:", e)
        return False
    finally:
        cursor.close()
        conn.close() # type: ignore

def authenticate_user(email, password):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True) # type: ignore

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    cursor.close()
    conn.close() # type: ignore

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')): # type: ignore
        return user
    return None

def acheter_gateau(user_id, id_gateau, quantite_achetee):
    conn = get_connection()
    cursor = conn.cursor() # type: ignore
    try:
        # Vérifier si suffisamment en stock
        cursor.execute("SELECT quantite FROM gateau WHERE id_gateau = %s", (id_gateau,))
        stock = cursor.fetchone()[0] # type: ignore
        if stock < quantite_achetee:
            return {"error": "Quantité insuffisante"}, 400

        # Insérer l'achat
        cursor.execute("""
            INSERT INTO achat (user_id, id_gateau, quantite_achetee)
            VALUES (%s, %s, %s)
        """, (user_id, id_gateau, quantite_achetee))

        # Mettre à jour la quantité dans gateau
        cursor.execute("""
            UPDATE gateau SET quantite = quantite - %s WHERE id_gateau = %s
        """, (quantite_achetee, id_gateau))

        conn.commit() # type: ignore
        return {"message": "Achat effectué"}, 200
    except Exception as e:
        print("Erreur achat:", e)
        conn.rollback() # type: ignore
        return {"error": "Erreur serveur"}, 500
    finally:
        cursor.close()
        conn.close() # type: ignore

def ajouter_favori(user_id, id_gateau):
    conn = get_connection()
    cursor = conn.cursor() # type: ignore
    try:
        cursor.execute("""
            INSERT IGNORE INTO favoris (user_id, id_gateau)
            VALUES (%s, %s)
        """, (user_id, id_gateau))
        conn.commit() # type: ignore
        return {"message": "Ajouté aux favoris"}, 200
    except Exception as e:
        print("Erreur favoris:", e)
        return {"error": "Erreur serveur"}, 500
    finally:
        cursor.close()
        conn.close() # type: ignore
        
def get_favoris(user_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)  # type: ignore
    try:
        cursor.execute("""
            SELECT g.* FROM gateau g
            JOIN favoris f ON g.id_gateau = f.id_gateau
            WHERE f.user_id = %s
        """, (user_id,))
        return cursor.fetchall()
    except Exception as e:
        print("Erreur récupération favoris:", e)
        return None
    finally:
        cursor.close()
        conn.close()  # type: ignore

def retirer_favori(user_id, id_gateau):
    conn = get_connection()
    cursor = conn.cursor()  # type: ignore
    try:
        cursor.execute("""
            DELETE FROM favoris WHERE user_id = %s AND id_gateau = %s
        """, (user_id, id_gateau))
        conn.commit()  # type: ignore
        return {"message": "Retiré des favoris"}, 200
    except Exception as e:
        print("Erreur suppression favori:", e)
        return {"error": "Erreur serveur"}, 500
    finally:
        cursor.close()
        conn.close()  # type: ignore

