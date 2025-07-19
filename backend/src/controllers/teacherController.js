const {
    createStudent, 
    getTeacherStudentsByEmail 
} = require("../services/teacherService");


const readTeacherStudentByEmail = async(req, res) => {
    try{
        const data = req.data;
        console.log(data.email);
        const {email} = req.data;
        const result = await getTeacherStudentsByEmail(email);
        console.log(result);
        res.send({status: true, data: result});
    } catch (err){
        console.log(err);
        res.send({status: false, data: null, error: err});
    }
}

module.exports = {
    readTeacherStudentByEmail
}