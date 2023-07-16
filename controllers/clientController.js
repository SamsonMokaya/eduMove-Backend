const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  pool.query('SELECT * FROM clients WHERE email = $1', [email])
    .then(result => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Email not found' });
      } else {
        const client = result.rows[0];
        const hashedPassword = client.password;
        // Compare the provided password with the hashed password
        bcrypt.compare(password, hashedPassword)
          .then(match => {
            if (match) {
              console.log('Password match');
              const accessToken = jwt.sign(
                { id: client.id, name: client.name, email: client.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
              );
              res.status(200).json({ accessToken });
            } else {
              console.log('Password does not match');
              res.status(401).json({ error: 'Invalid password' });
            }
          })
          .catch(error => {
            console.log('Error comparing passwords:', error);
            res.status(500).json({ error: 'An error occurred while comparing passwords' });
          });
      }
    })
    .catch(error => {
      console.log('Error retrieving password:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the password' });
    });
};


// Get rides for the current client
// @route GET /api/rides/current
// @access private
const getCurrentUserRides = (req, res) => {
  const id = req.user.id; // Retrieve the user ID from req.client

  pool.query('SELECT * FROM rides WHERE client_id = $1', [id])
    .then(result => {
      res.status(200).json({ data: result.rows });
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while fetching rides for the current user' });
    });
};


// Show current client
// @route POST /api/clients/current
// @access private
const currentClient = (req, res) => {
  res.json(req.user);
};

module.exports = { registerClient, loginClient, currentClient, getCurrentUserRides };
