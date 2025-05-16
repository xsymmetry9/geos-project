
const {Router} = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const {
    loginAdmin,
    getAllTeachers,
    getTeachersByLanguageOnDB,
    getTeacherByEmailOnDB} = require("../controllers/adminController.js");

const levelDataPath = path.join(__dirname, "../../asset/levelInformation.json");

//Verify admin
router.post("/api/admin/login", loginAdmin);

// Get Teachers
router.get("/api/admin/teachers", getAllTeachers);

// Get Teachers By Language
router.get("api/admin/teachers/language", getTeachersByLanguageOnDB );

// Get Teacher By Email
router.get("/api/admin/getTeacherByEmail", getTeacherByEmailOnDB);

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

router.get("/", async (req, res ) => {
    res.send("backend is working");
})

module.exports = router;