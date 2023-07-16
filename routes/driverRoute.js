const express = require("express");
const router = express.Router();

const {
    registerDriver,
    loginDriver,
    currentDriver,
    getRidesForDriver,
    approveOrRejectRide
} = require("../controllers/driverController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerDriver).post('/login', loginDriver).get("/current", validateToken, currentDriver);
router.route("/:id").put(approveOrRejectRide);
router.get("/myrides" ,getRidesForDriver)
module.exports = router;
