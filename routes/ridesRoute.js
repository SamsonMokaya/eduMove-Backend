const express = require("express")
const router = express.Router()
const {getRides, getRide, bookRide, updateRide, deleteRide} = require("../controllers/ridesController")

//get all rides, book a ride
router.route("/").get(getRides).post(bookRide)

// Get a ride, update a booked ride, delete a booked ride
router.route("/:id").get(getRide).put(updateRide).delete(deleteRide)


module.exports = router;