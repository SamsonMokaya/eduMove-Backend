const express = require("express");
const router = express.Router();

const {
  getAllClients,
  getBookedRides,
  createClient,
  getBookedRide,
  rescheduleRide,
  deleteBookedRide,
  getAllDrivers
} = require("../controllers/adminController");


// Create a new client
// @route POST /api/admin/client
// @access private (admin only)
router.post("/client", createClient);

// get all clients
// @route GET /api/admin/clients
// @access private (admin only)
router.get("/clients", getAllClients);

// Get all drivers
// @route GET /api/admin/drivers
// @access private (admin only)
router.get("/drivers", getAllDrivers);

// Get all booked rides
// @route GET /api/admin/rides
// @access private (admin only)
router.get("/rides", getBookedRides);


// View a booked ride
// @route GET /api/admin/rides/:id
// @access private (admin only)
router.get("/rides/:id", getBookedRide);

// Reschedule a booked ride
// @route PUT /api/admin/rides/:id
// @access private (admin only)
router.put("/rides/:id", rescheduleRide);

// Delete a booked ride
// @route DELETE /api/admin/rides/:id
// @access private (admin only)
router.delete("/rides/:id", deleteBookedRide);

module.exports = router;
