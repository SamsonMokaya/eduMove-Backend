const pool = require('../db');

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
          // Insert new client
          pool.query('INSERT INTO clients (name, password, email) VALUES ($1, $2, $3) RETURNING *', [name, password, email])
            .then(result => {
              res.status(201).json({ message: 'Account created successfully', data: result.rows[0] });
            })
            .catch(error => {
              res.status(500).json({ error: 'An error occurred while creating the account' });
            });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while checking the email uniqueness' });
      });
  };
  


  // log in to your account
// @route POST /api/account
// @access public
const loginClient = (req, res) => {
    res.json({message: "logged in succesfully"})
  };


// Show current client
// @route POST /api/account
// @access private
const currentClient = (req, res) => {
    res.json({message: "Current user"})
  };


  module.exports = {registerClient, loginClient, currentClient}