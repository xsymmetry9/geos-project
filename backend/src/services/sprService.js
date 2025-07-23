const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');

dotenv.config();

const create = async (obj) => {
  const {studentId, teacherEmail, data} = obj;
    console.log("StudentId is:", studentId);

    const student = await prisma.student.findUnique({
      where: {id: studentId},
      include: {
        teachers: {
          include: {teacher: true}
        }
      }
    });

    console.log("Student is", student);

    if(!student|| student.teachers.length === 0){
      console.error("Student or associated teacher not found");
      return;
    }

    const checkIfTeacher = student.teachers.find((item) => item.email === teacherEmail);
    if(checkIfTeacher) {
      console.error(`Teacher ${teacherEmail} is not assigned to student ${studentId}`);
      console.log(student.teachers);
      return;
    }
    if(!data.levels){
        console.error("Error with the levels");
        return null;
    }


    const createForm = await prisma.studentProgressReportEntry.create({
        data: {
          studentName: student.name,
    teacherEmail,
    studentId,
    language: data.language || "",
    course: data.course || "",
    textbook: data.textbook || "",
    attendance: data.attendance || 0,
    totalLessons: data.totalLessons || 0,
    feedback: data.feedback || "",

    vocabularyInitial: data.levels?.vocabulary?.initial || "",
    vocabularyTarget: data.levels?.vocabulary?.target || "",
    vocabularyFinal: data.levels?.vocabulary?.final || "",

    grammarInitial: data.levels?.grammar?.initial || "",
    grammarTarget: data.levels?.grammar?.target || "",
    grammarFinal: data.levels?.grammar?.final || "",

    listeningInitial: data.levels?.listening?.initial || "",
    listeningTarget: data.levels?.listening?.target || "",
    listeningFinal: data.levels?.listening?.final || "",

    speakingInitial: data.levels?.speaking?.initial || "",
    speakingTarget: data.levels?.speaking?.target || "",
    speakingFinal: data.levels?.speaking?.final || "",

    pronunciationInitial: data.levels?.pronunciation?.initial || "",
    pronunciationTarget: data.levels?.pronunciation?.target || "",
    pronunciationFinal: data.levels?.pronunciation?.final || ""
        }
    })
    if(!createForm){
        console.error("Error creating SPR entry:", error);
        return;
    }
    return createForm;
    
}
module.exports = {
    create
}