const {Router} = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");

const levelDataPath = path.join(__dirname, "../asset/levelInformation.json");

//Gets all users
router.get("/api", async (req, res) =>{
    try {
        data = JSON.parse(fs.readFileSync(levelDataPath, "utf-8"));
        res.json(data);
    } catch (err) {
        console.error("Error loading level information:", error);
        res.status(500).json({ error: "Failed to load level data"});
    }

});

module.exports = router;