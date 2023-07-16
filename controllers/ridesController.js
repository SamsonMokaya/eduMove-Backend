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

// Book a rides
// @route POST /api/rides
// @access public
const bookRide = (req, res) => {
    const { client_id, driver_id } = req.body;
  
    if (!client_id || !driver_id) {
      res.status(400).json({ error: 'All fields are mandatory' });
      return;
    }
  
    pool.connect((err, client, release) => {
      if (err) {
        res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const insertRideQuery = 'INSERT INTO rides (client_id, driver_id) VALUES ($1, $2) RETURNING *';
      const values = [client_id, driver_id];
  
      client.query(insertRideQuery, values)
        .then(result => {
          release();
          res.status(201).json({ message: 'Ride booked successfully', data: result.rows[0] });
        })
        .catch(error => {
          release();
          res.status(500).json({ error: 'An error occurred while booking the ride' });
        });
    });
  };
  
  

// Update a rides
// @route PUT /api/rides
// @access public
// Update a ride
// @route PUT /api/rides/:id
// @access public
const updateRide = (req, res) => {
    const { id } = req.params;
    const { client_id, driver_id } = req.body;
  
    pool.query('UPDATE rides SET client_id = $1, driver_id = $2 WHERE id = $3 RETURNING *', [client_id, driver_id, id])
      .then(result => {
        if (result.rows.length > 0) {
          res.status(200).json({ message: 'Ride updated successfully', data: result.rows[0] });
        } else {
          res.status(404).json({ error: 'Ride not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while updating the ride' });
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