require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/routes.js");

const corsConfig ={
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
}
app.use(cors(corsConfig));
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`CORS-enabled web server listening on port ${port}`)});