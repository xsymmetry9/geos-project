
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
    readTeacherStudentByEmail
} = require("../controllers/teacherController.js");


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

router.get("/api/profile/getStudent", verifyToken);

router.get("/api/profile/addStudent", verifyToken);

router.get("/api/profile/deleteStudent", verifyToken);

router.get("/api/profile/updateStudent", verifyToken);
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