import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Format Token
// Authorization: Bearer <access_token>
export function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log("Bearer Header:", bearerHeader);

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    try {
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
      req.data = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(403).json({ message: "No token provided" });
  }
}


export function verifyAdminCredentials(req, res, next) {

  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    try {
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
      req.data = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(403).json({ message: "No token provided" });
  }
}