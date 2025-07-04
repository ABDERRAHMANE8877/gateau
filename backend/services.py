from dal import get_connection
import bcrypt



def create_user(username, email, password, role="client"):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True) # type: ignore

    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        cursor.execute(
            "INSERT INTO users (username, email, password_hash, role) VALUES (%s, %s, %s, %s)",
            (username, email, password_hash.decode('utf-8'), role)
        )
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


def get_all_cakes():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)  # type: ignore

    try:
        cursor.execute("SELECT * FROM gateaux")
        cakes = cursor.fetchall()
        return cakes
    except Exception as e:
        print("Error fetching cakes:", e)
        return []
    finally:
        cursor.close()
        conn.close()  # type: ignore


def ajouter_gateau(categorie, nom, quantite, prix, image_url):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True) # type: ignore

    try:
        cursor.execute(
            "INSERT INTO gateaux (categorie, nom, quantite, prix, image_url) VALUES (%s, %s, %s, %s, %s)",
            (categorie, nom, quantite, prix, image_url)
        )
        conn.commit() # type: ignore
        return True
    except Exception as e:
        print("Erreur ajout gâteau :", e)
        return False
    finally:
        cursor.close()
        conn.close() # type: ignore


def supprimer_gateau_par_nom(nom):
    conn = get_connection()
    cursor = conn.cursor() # type: ignore # type: ignore
    try:
        cursor.execute("DELETE FROM gateaux WHERE nom = %s", (nom,))
        conn.commit() # type: ignore
        return cursor.rowcount  # nombre de lignes supprimées
    except Exception as e:
        print("Error:", e)
        return 0
    finally:
        cursor.close()
        conn.close() # type: ignore


def modifier_gateau_par_nom(nom, quantite, prix, categorie, image_url):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE gateaux
            SET quantite = %s, prix = %s, categorie = %s, image_url = %s
            WHERE nom = %s
        """, (quantite, prix, categorie, image_url, nom))
        conn.commit()
        return cursor.rowcount  # nombre de lignes modifiées
    except Exception as e:
        print("Error:", e)
        return 0
    finally:
        cursor.close()
        conn.close()
