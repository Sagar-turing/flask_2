from flask import Flask, render_template, request, redirect, url_for, session
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Enable CORS to allow your frontend to communicate with your Flask server
CORS(app)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    # Obtain the username and password from the request
    username = request.form['username']
    password = request.form['password']
    
    # Here you should have your logic to check the credentials against your user database
    # For simplicity, let's assume we have a user with username 'admin' and password 'admin'
    if username == 'admin' and password == 'admin':
        session['logged_in'] = True
        return redirect(url_for('home'))
    else:
        return 'Invalid Credentials!'

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)