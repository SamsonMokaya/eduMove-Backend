const express = require("express");
const router = express.Router();

const {
    registerDriver,
    loginDriver,
    currentDriver,
    getRidesForDriver,
    approveOrRejectRide
} = require("../controllers/driverController");

router.post("/register", registerDriver).post('/login', loginDriver).get("/current", currentDriver);
router.route("/:id").get(getRidesForDriver).put(approveOrRejectRide);

module.exports = router;
