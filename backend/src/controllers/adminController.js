const {
    verifyAdminCredentials,
    getTeachersFromDb, 
    getTeachersByLanguage,
    getTeacherByEmail} = require("../services/adminService.js");

const capitalize = (str) =>{
    const result = str.charAt(0).toUpperCase() + str.slice(1);
    return result;
}
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
    try {
        const result = await getTeachersFromDb();
        console.log(result);

        return res.json({success: true, data: result});
    } catch (err) {
        return res.status(500).json({success: false, message: "Server Error"});
    }
}

const getTeachersByLanguageOnDB = async(req, res) =>{
    const {language} = req.query;
    try{
        const result = await getTeachersByLanguage(capitalize(language));
        return res.json({success: true, data: result});

    } catch (err) {
        return res.status(500).json({success: false, message: "Server Error"})
    }
}

const getTeacherByEmailOnDB = async(req, res) =>{
    const {email} = req.query;
    try{
        const result = await getTeacherByEmail(email);
        return res.json({success: true, data: result});
    } catch (err) {
        return res.status(500).json({success: false, message: "Server Error"});
    }
}

module.exports = {
    loginAdmin,
    getAllTeachers,
    getTeachersByLanguageOnDB,
    getTeacherByEmailOnDB}