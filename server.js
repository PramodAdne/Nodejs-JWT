const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

// Secret key for JWT
const secretKey = 'your-secret-key';

// Middleware to parse JSON
app.use(bodyParser.json());

// Example route for generating JWT tokens
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // You should validate the username and password here

  // If the username and password are valid, generate a JWT token
  const token = jwt.sign({ username }, secretKey);
  res.json({ token });
});

// Protected route example
app.get('/protected', (req, res) => {
  // Verify the JWT token here
  const token = req.headers['authorization'];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication failed' });
    }
    return res.json({ message: 'Welcome to the protected route, ' + decoded.username });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
