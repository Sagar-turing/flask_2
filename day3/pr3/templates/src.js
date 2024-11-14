document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get the username and password from the form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Send the form data to the Flask server using a POST request
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
    }).then(response => response.text())
    .then(data => {
        if (data === 'Invalid Credentials!') {
            alert(data);
        } else {
            // Redirect to the home page on successful login
            window.location.href = '/';
        }
    });
});