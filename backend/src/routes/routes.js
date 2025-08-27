import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  loginAdmin,
  getAllTeachers,
  getTeachersByLanguageOnDB,
  getTeacherByEmailOnDB,
  createTeacher,
  loginTeacher,
} from "../controllers/adminController.js";
import { verifyAdminCredentials, verifyToken } from "../middlewares/authMiddleware.js";
import {
  createStudentTeacherByEmail,
  readStudentById,
  readTeacherStudentByEmail,
  updateStudentById,
  deleteStudentById,
} from "../controllers/teacherController.js";
import {
  createStudentProgressReport,
  getStudentReport,
  getAllStudentReportsByStudentID,
  updateAllDataStudentReportByFormID,
  deleteFormByFormID,
} from "../controllers/studentProgressReportController.js";
import {
  createLevelCheckForm,
  getLevelCheckReport,
  updateAllDataLevelcheckFormByFormID,
  deleteLevelCheckByFormID,
} from "../controllers/levelCheckFormController.js";

const router = Router();

// For resolving __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const levelDataPath = path.join(__dirname, "../../asset/levelInformation.json");

// -------------------------- AUTH -------------------------------
router.get("/api/verify-token", verifyToken, (req, res) => {
  res.json({ authenticate: true, user: req.user });
});

router.get("/api/admin/verify-admin", verifyAdminCredentials, (req, res) => {
  res.json({ authenticate: true, user: req.data });
});
router.post("/api/admin/login", loginAdmin);
router.get("/api/admin/teachers", verifyAdminCredentials, getAllTeachers);
router.get("/api/admin/teachers/language", getTeachersByLanguageOnDB);
router.get("/api/getTeacherByEmail", getTeacherByEmailOnDB);
router.post("/api/login", loginTeacher);

// -------------------------- TEACHER ----------------------------
router.get("/api/profile", verifyToken, readTeacherStudentByEmail);
router.get("/api/member/getStudentById/:id", verifyToken, readStudentById);
router.post("/api/member/addStudent", verifyToken, createStudentTeacherByEmail);
router.delete("/api/member/deleteStudent/:id", verifyToken, deleteStudentById);
router.put("/api/member/updateStudent/:id", verifyToken, updateStudentById);

// -------------------------- STUDENT PROGRESS REPORT ------------
router.post("/api/member/createSPR/:id", verifyToken, createStudentProgressReport);
router.get("/api/member/getSPR/:formID", verifyToken, getStudentReport);
router.put("/api/member/updateSPR/:formID", verifyToken, updateAllDataStudentReportByFormID);
router.delete("/api/member/deleteForm/:formID", verifyToken, deleteFormByFormID);

// -------------------------- LEVEL CHECK FORM -------------------
router.post("/api/member/createLevelCheck/:id", verifyToken, createLevelCheckForm);
router.get("/api/member/getLevelCheck/:formId", verifyToken, getLevelCheckReport);
router.put("/api/member/updateLevelCheck", verifyToken, updateAllDataLevelcheckFormByFormID);
router.delete("/api/member/deleteLevelCheck/:formId", verifyToken, deleteLevelCheckByFormID);

// -------------------------- MISC -------------------------------
router.get("/api", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(levelDataPath, "utf-8"));
    res.json(data);
  } catch (err) {
    console.error("Error loading level information:", err);
    res.status(500).json({ error: "Failed to load level data" });
  }
});

router.get("/api/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});

router.post("/api/createTeacherProfile", createTeacher);

router.get("/", (req, res) => {
  res.send("backend is working");
});

export default router;
