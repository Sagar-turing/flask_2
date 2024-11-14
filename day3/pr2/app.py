from flask import Flask, request, jsonify, render_template
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user

app = Flask(__name__)
app.secret_key = 'your_secret_key'

login_manager = LoginManager()
login_manager.init_app(app)

# Mock database
users = {'user@example.com': {'password': 'password'}}

class User(UserMixin):
    pass

@app.route("/")
def index():
    return render_template('login/html')

@login_manager.user_loader
def user_loader(email):
    if email not in users:
        return

    user = User()
    user.id = email
    return user

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if email in users and users[email]['password'] == password:
            user = User()
            user.id = email
            login_user(user)
            return jsonify(message='Logged in successfully'), 200
        return jsonify(message='Invalid credentials'), 401

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(message='Logged out successfully'), 200

if __name__ == '__main__':
    app.run(debug=True)