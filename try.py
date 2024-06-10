from flask import Flask, request, jsonify, redirect, url_for
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'quiz_me'

mysql = MySQL(app)

@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    email = request.form['email']
    password = generate_password_hash(request.form['password'])

    cursor = mysql.connection.cursor()
    cursor.execute('INSERT INTO users (name, email, password) VALUES (%s, %s, %s)', (name, email, password))
    mysql.connection.commit()
    cursor.close()

    return jsonify(message="User registered successfully"), 201

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user[3], password):
        return jsonify(message=f"Welcome back, {user[1]}"), 200
    else:
        return jsonify(message="Invalid email or password"), 401

if __name__ == '__main__':
    app.run(debug=True)
