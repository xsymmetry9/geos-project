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
    const {teacherEmail, email, name, nickname} = obj
    const result = await prisma.student.create({
    data: {
      id: crypto.randomUUID(),
      email: email,
      name: name,
      nickname: nickname,
      teachers: {
        create: [
          {
            teacher: {connect: {email: teacherEmail}},
          },
        ],
      },
    },
    include: {
      teachers: {include: {teacher: true}}
    }
  });
  if (!result) {
    console.error("Failed to create");
    return;
  }

  return result;

  } 
  const updateStudent = async(obj) =>{
    const {name, nickname, email} = obj
    const result = await prisma.student.update({
      where: {id: obj.id}, 
      data: {
        name: name,
        nickname: nickname,
        email: email
      },
    });
    return result;
  }
  const readStudent = async (studentId) => {
    const result = await prisma.student.findUnique({where: {id: studentId}});
    return result;
  }

  const deleteById = async (studentId) => {
    const {teacherEmail, email, name, nickname} = obj

    const result = await prisma.student.delete({where: {id: studentId}});

    return result;
  }

module.exports = {
    getTeacherStudentsByEmail,
    createStudent,
    readStudent,
    updateStudent,
    deleteById
}

