const {
    verifyAdminCredentials,
    getTeachersFromDb, 
    getTeachersByLanguage,
    getTeacherByEmail,
    create} = require("../services/adminService.js");
const bcrypt = require("bcrypt");

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
    const {email} = req.body;
    console.log(req);
    try{
        const result = await getTeacherByEmail(email);
        return res.json({success: true, exists: true, data: result});
    } catch (err) {
        return res.status(500).json({success: false, message: "Server Error"});
    }
}

const createTeacher = async(req, res) => {
    const {name, email, password, language} = req.body;
    try{
        const checkIfAvailable = await getTeacherByEmail(email);
        if(!checkIfAvailable) {
            const result = await create({name: name, email: email, password: password, language: language})
            return res.json({result: true, message: "Account successfuly created", data: result});
        } else {
            return res.json({result: false, message: "Email is taken, try another one"});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({result: false, message: `Fail to add account`});
    }
}

const loginTeacher = async(req, res) => {
    const {email, password} = req.body;
    console.log(email);
    try {
        const teacher = await getTeacherByEmail(email);
        if(!teacher) return res.status(500).json({success: false, message: "Couldn't find teacher"});

        const match = await bcrypt.compare(password, teacher.password);
        if(!match) return res.status(500).json({success: false, message: "Incorrect password"})

        return res.json({result: true, message: "Successfully logged in"});
    } catch (err) {
        return res.json({result: false, message: "Cannot connect to server"});
    }
}

module.exports = {
    loginAdmin,
    getAllTeachers,
    getTeachersByLanguageOnDB,
    getTeacherByEmailOnDB,
    createTeacher,
    loginTeacher}