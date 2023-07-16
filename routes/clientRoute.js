const express = require("express");
const router = express.Router();

const {
    registerClient,
    loginClient,
    currentClient,
} = require("../controllers/clientController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerClient).post('/login', loginClient).get("/current", validateToken, currentClient);


module.exports = router;