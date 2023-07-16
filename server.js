const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv  = require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use(express.json())
app.use("/api/rides", require("./routes/ridesRoute"));
app.use("/api/clients", require("./routes/clientRoute"));
app.use("/api/drivers", require("./routes/driverRoute"));
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})