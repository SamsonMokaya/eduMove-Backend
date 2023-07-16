const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const {
    registerClient,
    loginClient,
    currentClient,
    getCurrentUserRides,
} = require("../controllers/clientController");


router.post("/register", registerClient).post('/login', loginClient).get("/current", validateToken, currentClient).get('/myrides', validateToken, getCurrentUserRides);


module.exports = router;