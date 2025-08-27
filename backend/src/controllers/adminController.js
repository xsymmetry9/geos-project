import {
  verifyAdminCredentials,
  getTeachersFromDb,
  getTeachersByLanguage,
  getTeacherByEmail,
  create,
} from "../services/adminService.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const loginAdmin = async (req, res) => {
  const { name, password } = req.body;
  console.log(name, password);
  try {
    const success = await verifyAdminCredentials(name, password);

    if(success  === false) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const payload = { name };
    jwt.sign(
      payload, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }, (err, token) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Token generation failed" });
        }
        return res.json({ success, token, payload });
      }
    );

  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const result = await getTeachersFromDb();
    console.log(result);
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getTeachersByLanguageOnDB = async (req, res) => {
  const { language } = req.query;
  try {
    const result = await getTeachersByLanguage(capitalize(language));
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getTeacherByEmailOnDB = async (req, res) => {
  const { email } = req.body;
  console.log(req);
  try {
    const result = await getTeacherByEmail(email);
    return res.json({ success: true, exists: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createTeacher = async (req, res) => {
  const { name, email, password, language } = req.body;
  try {
    const checkIfAvailable = await getTeacherByEmail(email);
    if (!checkIfAvailable) {
      const result = await create({ name, email, password, language });
      return res.json({
        result: true,
        message: "Account successfully created",
        data: result,
      });
    } else {
      return res.json({ result: false, message: "Email is taken, try another one" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ result: false, message: "Fail to add account" });
  }
};

export const loginTeacher = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getTeacherByEmail(email);
    if (!user) {
      return res.status(500).json({ result: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ result: false, message: "Invalid password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      language: user.language,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" },
      (err, token) => {
        res.json({ token, payload });
      }
    );
  } catch (err) {
    return res.status(500).json({ result: false, message: "Server error" });
  }
};
