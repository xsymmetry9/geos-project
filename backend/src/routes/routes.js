
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
const {ensureNotAuthenticated, ensureAuthenticated} = require("../middlewares/authMiddleware.js");

const levelDataPath = path.join(__dirname, "../../asset/levelInformation.json");
const passport = require('passport');

//Verify admin
router.post("/api/admin/login", loginAdmin);

// Get Teachers
router.get("/api/admin/teachers", getAllTeachers);

// Get Teachers By Language
router.get("api/admin/teachers/language", getTeachersByLanguageOnDB );

// Get Teacher By Email
router.get("/api/getTeacherByEmail", getTeacherByEmailOnDB);

// Member Login
router.post("/api/login", ensureNotAuthenticated, loginTeacher); //Blocks logged-users from login page

// Current Member
router.get("/api/currentTeacher", (req, res) =>{
    if(req.isAuthenticated()) {
        return res.json({user: req.user});
    } else {
        return res.status(401).json({user: null});
    }
})

//Logout route
router.post("/api/logout", (req, res) => {
    req.logout((err) => {
        if(err) return res.status(500).json({message: "Error logging out!"});
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.json({status: true, message: "Logged out"});
        });
    })
})
// Profile
router.post("/api/profile", ensureAuthenticated, (req, res) => {
    res.json({
        message: "This is a protected route",
        user: "Some member"
    })
})
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