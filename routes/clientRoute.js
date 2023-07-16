const express = require("express");
const router = express.Router();

const {
    registerClient,
    loginClient,
    currentClient,
} = require("../controllers/clientController")

router.post("/register", registerClient).post('/login', loginClient).get("/current", currentClient);


module.exports = router;