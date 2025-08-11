const {
    readStudent,
    createStudent,
    updateStudent,
    getTeacherStudentsByEmail,
    deleteById
} = require("../services/teacherService");

const createStudentTeacherByEmail = async (req, res) => {
 
    try {
        const user = req.data;
        const data = req.body;
        const obj = {teacherEmail: user.email, name: data.name, nickname: data.nickname, email: data.email};

        const result = await createStudent(obj);
        return res.send({status: true, user: user, message: "Student created", data: result});
    } catch (err) {
        return res.send({status: false, user: user, message: "Failed to create a student"});
    }
}

const readStudentById = async(req, res) => {
    const {id} = req.params;
    try {
        const result = await readStudent(id);
        res.send({status: true, data: result, message: "Success!"})
    } catch(err) {
        console.log(err);
        res.send({status: false, data: null, message: "There was an error in the backend"});
    }
}
const readTeacherStudentByEmail = async(req, res) => {
    try{
        const {email} = req.data;
        const result = await getTeacherStudentsByEmail(email);
        res.send({status: true, user: req.data, data: result});
    } catch (err){
        console.log(err);
        res.send({status: false, data: null, error: err});
    }
}

const updateStudentById = async(req, res) => {
    try{
        const obj = req.body;
        const result = await(updateStudent(obj));
        res.send({status: true, message: "Success", data: result});

    } catch (err){
        console.log(err);
        res.send({status: false, error: err});
    }
}

const deleteStudentById = async(req, res) =>{
    try{
        const {id} = req.params;

        console.log(id);
        const result = await deleteById(id);
        // console.log(result);
        return res.send({status: true, message: "Successfully delete the student"});
    } catch (err){
        console.log(err);
        res.send({status: false, message: "Failed to delete in the backend"});
    }

}
module.exports = {
    createStudentTeacherByEmail,
    readStudentById,
    readTeacherStudentByEmail,
    updateStudentById,
    deleteStudentById
}