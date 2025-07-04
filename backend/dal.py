import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='auth_db',
            user='root',
            password='abderrahmane',
            charset='utf8'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print("Erreur de connexion à MySQL :", e)
        return None


if __name__ == "__main__":
    conn = get_connection()
    if conn:
        print("✅ Connexion réussie à la base de données")
        conn.close()
    else:
        print("❌ Connexion échouée")