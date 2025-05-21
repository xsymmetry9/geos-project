// app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes/routes.js");
const session = require('express-session');
const passport = require('passport');
const initialializePassport = require('./config/passportConfig.js');

const app = express();
initialializePassport(passport);

// CORS Configuration
const corsConfig = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  }
}));

app.use(passport.initialize());
app.use(passport.session());

initialializePassport(passport);

// Routes
app.use("/", router);

module.exports = app;