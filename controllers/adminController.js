const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// Register admin
// @route POST /api/admin/
// @access public
const adminRegister = (req, res) => {
  const { name, password } = req.body;

  // Check if the name and password are provided
  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password are required.' });
  }

  // Check if the name already exists in the database
  pool.query('SELECT * FROM admin WHERE name = $1', [name])
    .then(result => {
      if (result.rows.length > 0) {
        return res.status(409).json({ error: 'Name already exists.' });
      }

      // Hash the password
      bcrypt.hash(password, 10)
        .then(hashedPassword => {
          // Store the admin details in the database
          pool.query('INSERT INTO admin (name, password) VALUES ($1, $2)', [name, hashedPassword])
            .then(() => {
              res.status(201).json({ message: 'Admin registered successfully.' });
            })
            .catch(error => {
              console.log('Error storing admin details:', error);
              res.status(500).json({ error: 'An error occurred while storing admin details.' });
            });
        })
        .catch(error => {
          console.log('Error hashing password:', error);
          res.status(500).json({ error: 'An error occurred while hashing the password.' });
        });
    })
    .catch(error => {
      console.log('Error checking if name exists:', error);
      res.status(500).json({ error: 'An error occurred while checking if name exists.' });
    });
};

// Admin login
// @route POST /api/admin/login
// @access public 
const adminLogin = (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

  pool.query('SELECT * FROM admin WHERE name = $1', [name])
    .then(result => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Name not found' });
      } else {
        const admin = result.rows[0];
        const hashedPassword = admin.password;
        // Compare the provided password with the hashed password
        bcrypt.compare(password, hashedPassword)
          .then(match => {
            if (match) {
              console.log('Password match');
              const token = jwt.sign(
                { name: admin.name },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
              );
              res.status(200).json({ token });
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



// Get all clients
// @route GET /api/admin/clients
// @access private (admin only)
const getAllClients = (req, res) => {
  pool.query("SELECT * FROM clients")
    .then(result => {
      res.status(200).json({ data: result.rows });
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while fetching clients' });
    });
};

// Create a new client
// @route POST /api/admin/clients
// @access private (admin only)
const createClient = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

  pool.query('SELECT * FROM clients WHERE email = $1', [email])
    .then(result => {
      if (result.rows.length > 0) {
        res.status(400).json({ error: 'Email must be unique' });
      } else {
        // Hash password
        bcrypt.hash(password, 10)
          .then(hashedPassword => {
            // Insert new client
            pool.query('INSERT INTO clients (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword])
              .then(result => {
                res.status(201).json({ message: 'Client created successfully', data: result.rows[0] });
              })
              .catch(error => {
                res.status(500).json({ error: 'An error occurred while creating the client' });
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


// Get all drivers
// @route GET /api/admin/clients
// @access private (admin only)
const getAllDrivers = (req, res) => {
  pool.query('SELECT * FROM drivers')
    .then(result => {
      res.status(200).json({ data: result.rows });
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while fetching drivers' });
    });
};



// Get all booked rides
// @route GET /api/admin/rides
// @access private (admin only)
const getBookedRides = (req, res) => {
  pool.query("SELECT * FROM rides")
    .then(result => {
      res.status(200).json({ data: result.rows });
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while fetching booked rides' });
    });
};




// View a booked ride
// @route GET /api/admin/rides/:id
// @access private (admin only)
const getBookedRide = (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM rides WHERE id = $1', [id])
    .then(result => {
      if (result.rows.length > 0) {
        res.status(200).json({ data: result.rows[0] });
      } else {
        res.status(404).json({ error: 'Booked ride not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while fetching the booked ride' });
    });
};

// Reschedule a booked ride
// @route PUT /api/admin/rides/:id
// @access private (admin only)
const rescheduleRide = (req, res) => {
  const { id } = req.params;
  const { client_id, driver_id, status } = req.body;

  // Check if client_id exists in clients table
  pool.query('SELECT * FROM clients WHERE id = $1', [client_id])
    .then(clientResult => {
      if (clientResult.rows.length === 0) {
        res.status(404).json({ error: 'Client not found' });
      } else {
        // Check if driver_id exists in drivers table
        pool.query('SELECT * FROM drivers WHERE id = $1', [driver_id])
          .then(driverResult => {
            if (driverResult.rows.length === 0) {
              res.status(404).json({ error: 'Driver not found' });
            } else {
              pool.query('UPDATE rides SET client_id = $1, driver_id = $2, status = $3 WHERE id = $4 RETURNING *', [client_id, driver_id, status, id])
                .then(result => {
                  if (result.rows.length === 0) {
                    res.status(404).json({ error: 'Ride not found' });
                  } else {
                    res.status(200).json({ message: 'Ride updated successfully', data: result.rows[0] });
                  }
                })
                .catch(error => {
                  res.status(500).json({ error: 'An error occurred while updating the ride' });
                });
            }
          })
          .catch(error => {
            res.status(500).json({ error: 'An error occurred while checking the driver ID' });
          });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while checking the client ID' });
    });
};


// Delete a booked ride
// @route DELETE /api/admin/rides/:id
// @access private (admin only)
const deleteBookedRide = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM rides WHERE id = $1 RETURNING *', [id])
    .then(result => {
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Booked ride deleted successfully', data: result.rows[0] });
      } else {
        res.status(404).json({ error: 'Booked ride not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while deleting the booked ride' });
    });
};

module.exports = {
  adminRegister,
  adminLogin,
  getAllDrivers,
  getAllClients,
  getBookedRides,
  createClient,
  getBookedRide,
  rescheduleRide,
  deleteBookedRide
};
