const pool = require("../db")


// get all rides
// @route GET /api/rides
// @access public
const getRides = (req, res) => {
    pool.query('SELECT * FROM rides')
      .then(result => {
        res.status(200).json({ data: result.rows });
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while fetching rides' });
      });
  };

// Get a rides
// @route GET /api/rides
// @access public
const getRide = (req, res) => {
    const { id } = req.params;
  
    pool.query('SELECT * FROM rides WHERE id = $1', [id])
      .then(result => {
        if (result.rows.length > 0) {
          res.status(200).json({ data: result.rows[0] });
        } else {
          res.status(404).json({ error: 'Ride not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while fetching the ride' });
      });
  };



  
  
// Book a ride
// @route POST /api/rides
// @access public
const bookRide = (req, res) => {
  const { client_id, driver_id } = req.body;

  if (!client_id || !driver_id) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

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
              pool.query('INSERT INTO rides (client_id, driver_id) VALUES ($1, $2) RETURNING *', [client_id, driver_id])
                .then(result => {
                  res.status(201).json({ message: 'Ride booked successfully', data: result.rows[0] });
                })
                .catch(error => {
                  res.status(500).json({ error: 'An error occurred while booking the ride' });
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

// Update a ride
// @route PUT /api/rides/:id
// @access public
const updateRide = (req, res) => {
  const { id } = req.params;
  const { client_id, driver_id } = req.body;

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
              pool.query('UPDATE rides SET client_id = $1, driver_id = $2 WHERE id = $3 RETURNING *', [client_id, driver_id, id])
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



// Delete a rides
// @route DEL /api/rides
// @access public
const deleteRide = (req, res) => {
    const { id } = req.params;
  
    pool.query('DELETE FROM rides WHERE id = $1 RETURNING *', [id])
      .then(result => {
        if (result.rows.length > 0) {
          res.status(200).json({ message: 'Ride deleted successfully', data: result.rows[0] });
        } else {
          res.status(404).json({ error: 'Ride not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while deleting the ride' });
      });
  };


module.exports = {getRides, getRide, bookRide, updateRide, deleteRide}