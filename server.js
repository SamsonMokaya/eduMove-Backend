const express = require("express");
const dotenv  = require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use("/api/ride", require("./routes/ridesRoute"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})