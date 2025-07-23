const {create} = require("../services/sprService");
const createStudentProgressReport = async (req, res) => {
    const studentId = req.body.studentId;
    const teacherEmail = req.data.email;
    const data = req.body.data;

    console.log(studentId, teacherEmail);

    console.log("The data is:", data);

  
    try{
        const createForm = await create({studentId: studentId, teacherEmail: teacherEmail, data: data});

        res.send({status: true, message: "it worked!", data: createForm});
        return;

    } catch (error)
    {
        console.error("Error:", error);
        return;
    }

}

module.exports = {
    createStudentProgressReport
}