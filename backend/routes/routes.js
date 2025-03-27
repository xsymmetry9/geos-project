const {Router} = require("express");
const router = Router();
const User = require("../db/queries");
const levelData = require("../asset/levelInformation.json");

//Gets all users
router.get("/api/users", async (req, res) =>{
    try{
        const users = await User.getUsers();
        res.json(users);
    } catch (err){
        res.status(500).send("Server error");
    }
});

//Get a user by username
router.get("/api/users/:user", async(req, res) =>{
    const {username} = req.body;

    console.log(username);
})

//Get a user by id
router.get("/api/users/:id", async(req, res) =>{
    const {id} = req.body;
    console.log(id);
});

//Creates a new user
router.post("/api/users/add", async(req, res) =>{

});

//Updates user
router.post("/api/users/:user/update");

//Deletes user
router.post("/api/users/:user/delete");


//Test if it's connected
router.get("/api", async(req, res) =>{
    res.json({status: true, data: levelData})
    
})
router.get("/api/:language", async(req, res) =>{
    const language = req.params.language;
    const getDataByLanguage = levelData[language].vocabulary;
    res.json({status: true, data: getDataByLanguage})
    
})
module.exports = router;