const {verifyAdminCredentials, getTeachersFromDb, getTeachersByLanguage} = require("../services/adminService.js");

const loginAdmin = async(req, res) =>{
    const {name, password} = req.body;
    console.log(name, password);
    try{
        const success = await verifyAdminCredentials(name, password);
        return res.json({success});
    } catch (err) {
        return res.status(500).json({success: false, message: "Server Error"});
    }

}

const getAllTeachers = async(req, res) =>{
    const query = req.query;
    const language = query.language.toLowerCase();
    try {
        // const result = await getTeachersFromDb();
        const result = await getTeachersByLanguage(language);

        return res.json({success: true, data: result});
    } catch (err) {
        return res.status(500).json({success: false, message: "Server Error"});
    }
}

const getTeachersByLanguageOnDB = async(req, res) =>{
    const {language} = req.query;

    try{
        const result = await getTeachersByLanguage(language);
        return res.json({success: true, data: result});

    } catch (err) {
        return res.status(500).json({success: false, message: "Server Error"})
    }
}

module.exports = {loginAdmin, getAllTeachers, getTeachersByLanguageOnDB}