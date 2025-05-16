// app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes/routes.js");

const app = express();

// CORS Configuration
const corsConfig = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middleware
app.use(cors(corsConfig));
app.use(express.json());

// Routes
app.use("/", router);

module.exports = app;