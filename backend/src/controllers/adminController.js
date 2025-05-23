const {
    verifyAdminCredentials,
    getTeachersFromDb, 
    getTeachersByLanguage,
    getTeacherByEmail,
    create} = require("../services/adminService.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


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

const loginTeacher = async(req, res, next) => {
    const {email, password} = req.body;
    try{
        const user = await getTeacherByEmail(email);
        if(!user){
            return res.status(500).json({result: false, message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({result: false, message: "Invalid password"})
        }

        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            language: user.language
        }

        jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' }, (err, token) => {
            res.json({ token, payload });
            });
        }
    catch (err) {
        return res.status(500).json({result: false, message: "Server error"});
    }

};

module.exports = {
    loginAdmin,
    getAllTeachers,
    getTeachersByLanguageOnDB,
    getTeacherByEmailOnDB,
    createTeacher,
    loginTeacher}