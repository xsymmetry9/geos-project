require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/routes.js");

const corsConfig ={
    origin: "http://localhost:5173",  // <-- Allow frontend requests
    optionsSuccessStatus: 200,
    credentials: true,  // <-- Allow cookies if needed
}

// Middleware
app.use(cors(corsConfig));
app.use(express.json());


app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {console.log(`CORS-enabled web server listening on port ${port}`)});