from flask import Flask, request, jsonify, make_response,render_template
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# This is a simple in-memory structure to store users. In a real application, you would use a database.
users = {}


@app.route('/')
def index():
    return render_template('login.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if username in users:
        return make_response('Username already exists', 400)

    hashed_password = generate_password_hash(password)
    users[username] = hashed_password
    return make_response('User successfully registered', 201)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if username not in users or not check_password_hash(users[username], password):
        return make_response('Invalid credentials', 401)

    return make_response('User successfully logged in', 200)

if __name__ == '__main__':
    app.run(debug=True)