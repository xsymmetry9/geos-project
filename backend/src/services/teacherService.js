const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');

dotenv.config();

const getTeacherStudentsByEmail = async (email) => {
    const result = await prisma.studentTeacher.findMany({
        where: {teacherEmail: email},
        include: {
            student: {
                include: {
                    studentProgressReportEntry: true,
                    levelCheckEntries: true,
        }}}
    });

    if(!result || result.length === 0){
        console.log("No students found");
        return [];
    }

    return result.map((item) => item.student);
};


const createStudent = async (obj) => {
    const {email, name, nickname} = obj;

    const result = await prisma.student.create({
        data:{
            id: crypto.randomUUID(),
            name: name, 
            email: email,
            nickname: nickname,

        }
    });
    return result;
}

module.exports = {
    getTeacherStudentsByEmail,
    createStudent
}

