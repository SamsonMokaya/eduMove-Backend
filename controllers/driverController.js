const pool = require('../db');
const bcrypt = require('bcrypt');

// Register a driver
// @route POST /api/driver/register
// @access public
const registerDriver = (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

  // Check if email is unique
  pool.query('SELECT * FROM drivers WHERE email = $1', [email])
    .then(result => {
      if (result.rows.length > 0) {
        res.status(400).json({ error: 'Email must be unique' });
      } else {
        // Hash password
        bcrypt.hash(password, 10)
          .then(hashedPassword => {
            // Insert new driver
            pool.query('INSERT INTO drivers (name, password, email) VALUES ($1, $2, $3) RETURNING *', [name, hashedPassword, email])
              .then(result => {
                res.status(201).json({ message: 'Driver account created successfully', data: result.rows[0] });
              })
              .catch(error => {
                res.status(500).json({ error: 'An error occurred while creating the driver account' });
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

// Log in to driver account
// @route POST /api/driver/login
// @access public
const loginDriver = (req, res) => {
  res.json({ message: 'Driver logged in successfully' });
};

// Show current driver
// @route POST /api/driver/current
// @access private
const currentDriver = (req, res) => {
  res.json({ message: 'Current driver' });
};

// Get rides requested by a driver
// @route GET /api/rides/driver/:id
// @access public
const getRidesForDriver = (req, res) => {
    const { id } = req.params;
  
    pool.query('SELECT * FROM rides WHERE driver_id = $1', [id])
      .then(result => {
        res.status(200).json({ data: result.rows });
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while fetching rides for the driver' });
      });
  };

// Approve or reject a ride
// @route PUT /api/rides/:id
// @access public
  const approveOrRejectRide = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!status || (status !== 'approved' && status !== 'rejected')) {
      res.status(400).json({ error: 'Invalid status provided' });
      return;
    }
  
    pool.query('UPDATE rides SET status = $1 WHERE id = $2 RETURNING *', [status, id])
      .then(result => {
        if (result.rows.length > 0) {
          res.status(200).json({ message: 'Ride status updated successfully', data: result.rows[0] });
        } else {
          res.status(404).json({ error: 'Ride not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while updating the ride status' });
      });
  };


module.exports = { registerDriver, loginDriver, currentDriver, getRidesForDriver, approveOrRejectRide};
