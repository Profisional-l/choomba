from flask import Flask, jsonify, request
from flask_cors import CORS  # Импортируй CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Разрешить CORS для всех маршрутов

# Функция для подключения к базе данных
def get_db_connection():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row  # Для доступа к столбцам по имени
    return connection

# Создание таблицы объявлений
def init_db():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL
    )
    ''')
    connection.commit()
    connection.close()

@app.route('/announcements', methods=['GET', 'POST'])
def handle_announcements():
    if request.method == 'POST':
        data = request.get_json()
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute('INSERT INTO Announcements (title, description) VALUES (?, ?)',
                       (data['title'], data['description']))
        connection.commit()
        connection.close()
        return jsonify({'message': 'Announcement created!'}), 201

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM Announcements')
    announcements = cursor.fetchall()
    connection.close()

    return jsonify([{'id': a['id'], 'title': a['title'], 'description': a['description']} for a in announcements])

@app.route('/announcements/<int:id>', methods=['DELETE'])
def delete_announcement(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('DELETE FROM Announcements WHERE id = ?', (id,))
    connection.commit()
    connection.close()
    
    return jsonify({'message': 'Announcement deleted!'}), 200

if __name__ == '__main__':
    init_db()  # Создание базы данных и таблиц
    app.run(debug=False)  # Запуск приложения в режиме отладки
