// app.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import router from "./routes/routes.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://geos-frontend-woad.vercel.app"
];
// CORS Configuration
const corsConfig = {
  origin: allowedOrigins,
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
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  }
}));

// Routes
app.use("/", router);

export default app;
