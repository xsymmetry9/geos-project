
const {Router} = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const {
    loginAdmin,
    getAllTeachers,
    getTeachersByLanguageOnDB,
    getTeacherByEmailOnDB,
    createTeacher,
    loginTeacher} = require("../controllers/adminController.js");
const {verifyToken} = require("../middlewares/authMiddleware.js");

const {
    createStudentTeacherByEmail, 
    readStudentById, 
    readTeacherStudentByEmail, 
    updateStudentById, 
    deleteStudentById
} = require("../controllers/teacherController.js");

const {
    createStudentProgressReport, 
    getStudentReport, 
    getAllStudentReportsByStudentID, 
    updateAllDataStudentReportByFormID, 
    deleteFormByFormID
} = require("../controllers/studentProgressReportController.js");

const {
    createLevelCheckForm,
    getLevelCheckReport,
    updateAllDataLevelcheckFormByFormID,
    deleteLevelCheckByFormID
} = require("../controllers/levelCheckFormController.js");



const levelDataPath = path.join(__dirname, "../../asset/levelInformation.json");

router.get("/api/verify-token", verifyToken, (req, res) => {
    res.json({authenticate: true, user: req.user});
})
//Verify admin
router.post("/api/admin/login", loginAdmin);

// Get Teachers
router.get("/api/admin/teachers", getAllTeachers);

// Get Teachers By Language
router.get("api/admin/teachers/language", getTeachersByLanguageOnDB );

// Get Teacher By Email
router.get("/api/getTeacherByEmail", getTeacherByEmailOnDB);

// Member Login
router.post("/api/login", loginTeacher); //Blocks logged-users from login page

// ------------------------------------- Teacher---------------
router.get("/api/profile", verifyToken, readTeacherStudentByEmail);

router.get("/api/member/getStudentById/:id", verifyToken, readStudentById);

router.post("/api/member/addStudent", verifyToken, createStudentTeacherByEmail);

router.delete("/api/member/deleteStudent/:id", verifyToken, deleteStudentById);

router.put("/api/member/updateStudent/:id", verifyToken, updateStudentById);

// ------------------------------------ SPR ----------------------------------
router.post("/api/member/createSPR/:id", verifyToken, createStudentProgressReport);
router.get("/api/member/getSPR/:formID", verifyToken, getStudentReport);
router.put("/api/member/updateSPR/:formID", verifyToken, updateAllDataStudentReportByFormID);
router.delete("/api/member/deleteForm/:formID", verifyToken, deleteFormByFormID);

// ------------------------------------ Level Check ---------------------------
router.post("/api/member/createLevelCheck/:id", verifyToken, createLevelCheckForm);
router.get("/api/member/getLevelCheck/:formID", verifyToken, getLevelCheckReport);
router.get("/api/member/updateLevelCheck/:formID", verifyToken, updateAllDataLevelcheckFormByFormID);
router.delete("api/member/deleteLevelCheck/:formID", verifyToken, deleteLevelCheckByFormID);

//Gets all users
router.get("/api", async (req, res) =>{
    try {
        data = JSON.parse(fs.readFileSync(levelDataPath, "utf-8"));
        res.json(data);
    } catch (err) {
        console.error("Error loading level information:", err);
        res.status(500).json({ error: "Failed to load level data"});
    }
});

router.get("/api", (req, res) => {
    req.logout(err => {
        if(err) return res.status(500).json({message: "Logout failed"});
        res.json({message: "Logged out successfully"});
    });
});

//Create user
router.post("/api/createTeacherProfile", createTeacher)

router.get("/", async (req, res ) => {
    res.send("backend is working");
})

module.exports = router;