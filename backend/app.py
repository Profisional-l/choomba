from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db_connection():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    connection = get_db_connection()
    cursor = connection.cursor()
    
    # Создаем таблицу, если она не существует
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL
    )
    ''')
    
    # Проверяем, существует ли столбец user_ids
    cursor.execute("PRAGMA table_info(Announcements)")
    columns = [column[1] for column in cursor.fetchall()]
    
    if 'user_ids' not in columns:
        cursor.execute("ALTER TABLE Announcements ADD COLUMN user_ids INTEGER")
    
    connection.commit()
    connection.close()

@app.route('/send_userid', methods=['POST'])
def send_userid():
    try:
        data = request.json
        user_id = data.get('userID')
        print(f"Received UserID: {user_id}")

        # Обновляем существующее объявление, добавляя user_id
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute('UPDATE Announcements SET user_ids = ? WHERE id = (SELECT MAX(id) FROM Announcements)', (user_id,))
        connection.commit()
        connection.close()

        return jsonify({"status": "success", "userID": user_id})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/announcements', methods=['GET', 'POST'])
def handle_announcements():
    try:
        if request.method == 'POST':
            data = request.json
            title = data.get('title')
            description = data.get('description')
            user_id = data.get('userID')  # Получаем userID из данных

            if not title or not description:
                return jsonify({"status": "error", "message": "Title and description are required"}), 400
            
            connection = get_db_connection()
            cursor = connection.cursor()
            cursor.execute('INSERT INTO Announcements (title, description, user_ids) VALUES (?, ?, ?)', (title, description, user_id))
            connection.commit()
            connection.close()
            return jsonify({'message': 'Announcement created!'}), 201
        else:
            connection = get_db_connection()
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM Announcements')
            announcements = cursor.fetchall()
            connection.close()
            return jsonify([{'id': a['id'], 'title': a['title'], 'description': a['description'], 'user_ids': a['user_ids']} for a in announcements])
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/announcements/<int:id>', methods=['DELETE'])
def delete_announcement(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute('DELETE FROM Announcements WHERE id = ?', (id,))
        connection.commit()
        connection.close()
        return jsonify({'message': 'Announcement deleted!'}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)

