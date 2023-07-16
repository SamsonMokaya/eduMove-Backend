const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getAllClients,
  getBookedRides,
  createClient,
  getBookedRide,
  rescheduleRide,
  deleteBookedRide,
  getAllDrivers,
  adminRegister
} = require("../controllers/adminController");
const validateToken = require("../middleware/validateTokenHandler");

// Admin register
// @route POST /api/admin/register
// @access private (admin only)
router.post("/register", adminRegister);

// Admin login
// @route POST /api/admin/login
// @access private (admin only)
router.post("/login", adminLogin);

// Create a new client
// @route POST /api/admin/client
// @access private (admin only)
router.post("/client", validateToken, createClient);

// get all clients
// @route GET /api/admin/clients
// @access private (admin only)
router.get("/clients", validateToken, getAllClients);

// Get all drivers
// @route GET /api/admin/drivers
// @access private (admin only)
router.get("/drivers", validateToken, getAllDrivers);

// Get all booked rides
// @route GET /api/admin/rides
// @access private (admin only)
router.get("/rides", validateToken, getBookedRides);


// View a booked ride
// @route GET /api/admin/rides/:id
// @access private (admin only)
router.get("/rides/:id", validateToken, getBookedRide);

// Reschedule a booked ride
// @route PUT /api/admin/rides/:id
// @access private (admin only)
router.put("/rides/:id", validateToken, rescheduleRide);

// Delete a booked ride
// @route DELETE /api/admin/rides/:id
// @access private (admin only)
router.delete("/rides/:id", validateToken, deleteBookedRide);

module.exports = router;
