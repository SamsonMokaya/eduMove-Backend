const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = ("jsonwebtoken")

// Create an account
// @route POST /api/account
// @access public
const registerClient = (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

  // Check if email is unique
  pool.query('SELECT * FROM clients WHERE email = $1', [email])
    .then(result => {
      if (result.rows.length > 0) {
        res.status(400).json({ error: 'Email must be unique' });
      } else {
        // Hash password
        bcrypt.hash(password, 10)
          .then(hashedPassword => {
            // Insert new client
            pool.query('INSERT INTO clients (name, password, email) VALUES ($1, $2, $3) RETURNING *', [name, hashedPassword, email])
              .then(result => {
                res.status(201).json({ message: 'Account created successfully', data: result.rows[0] });
              })
              .catch(error => {
                res.status(500).json({ error: 'An error occurred while creating the account' });
              });
          })
          .catch(error => {
            res.status(500).json({ error: 'An error occurred while hashing the password' });
          });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while checking the email uniqueness' });
    });
};

// Log in to your account
// @route POST /api/account
// @access public
const loginClient = (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

  pool.query('SELECT password FROM clients WHERE email = $1', [email])
    .then(result => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Email not found' });
      } else {
        const hashedPassword = result.rows[0].password;
        // Compare the provided password with the hashed password
        bcrypt.compare(password, hashedPassword)
          .then(match => {
            if (match) {
              const accessToken = jwt.substring({
                result: {
                  name: result.name,
                  email: result.email,
                  id: result.id
                }
              }, )
              res.status(200).json({ accessToken });
            } else {
              res.status(401).json({ error: 'Invalid password' });
            }
          })
          .catch(error => {
            res.status(500).json({ error: 'An error occurred while comparing passwords' });
          });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while retrieving the password' });
    });
};


// Show current client
// @route POST /api/account
// @access private
const currentClient = (req, res) => {
  res.json({ message: 'Current user' });
};

module.exports = { registerClient, loginClient, currentClient };
