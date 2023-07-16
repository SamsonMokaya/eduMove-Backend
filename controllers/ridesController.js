const pool = require("../db")


// get all rides
// @route GET /api/rides
// @access public
const getRides = (req,  res) => {
    res.status(200).json({
        message: "Get all rides"
    })
}

// Get a rides
// @route GET /api/rides
// @access public
const getRide = (req, res)=>{
    res.status(200).json({
        message: `Get ride for ${req.params.id}`
    })
}

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
const updateRide = (req, res)=>{
    res.status(200).json({
        message: `Update ride for ${req.params.id}`
    })
}

// Delete a rides
// @route DEL /api/rides
// @access public
const deleteRide = (req, res)=>{
    res.status(200).json({
        message: `Delete a ride for ${req.params.id}`
    })
}


module.exports = {getRides, getRide, bookRide, updateRide, deleteRide}