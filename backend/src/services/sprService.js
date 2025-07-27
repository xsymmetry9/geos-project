const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');

dotenv.config();

const create = async (req) => {
    const studentId = req.body.studentId;
    const teacherEmail = req.data.email;

    const student = await prisma.student.findUnique({
      where: {id: studentId},
      include: {
        teachers: {
          include: {teacher: true}
        }
      }
    });

    console.log(student);

    if(!student|| student.teachers.length === 0){
      console.error("Student or associated teacher not found");
      return;
    }

    const checkIfTeacher = await prisma.studentTeacher.findFirst({
      where: {teacherEmail: teacherEmail}
    })

    if(!checkIfTeacher) {
      console.error(`Teacher ${teacherEmail} is not assigned to student ${studentId}`);
      return;
    }

    console.log(checkIfTeacher);

    const createEmptyForm = await prisma.studentProgressReportEntry.create({
      data: {
    studentId,
    teacherEmail,
    studentName: student.name,
    teacherEmail: teacherEmail,
    language: "",
    course: "",
    textbook:"",
    attendance: 0,
    totalLessons: 0,
    feedback: "",

    vocabularyInitial: "",
    vocabularyTarget: "",
    vocabularyFinal: "",

    grammarInitial: "",
    grammarTarget: "",
    grammarFinal: "",

    listeningInitial: "",
    listeningTarget: "",
    listeningFinal: "",

    speakingInitial: "",
    speakingTarget: "",
    speakingFinal: "",

    pronunciationInitial: "",
    pronunciationTarget: "",
    pronunciationFinal: ""
    }
});

    if(!createEmptyForm){
        console.error("Error creating SPR entry:", error);
        return;
    }
    return createEmptyForm;
    
}

const editAll = async(formId, data) =>{
    const updatedForm = await prisma.studentProgressReportEntry.update({
      where: {id: formId},
      data: {
        course: data.course,
        textbook: data.textbook,
        attendance: data.attendance,
        totalLessons: data.totalLessons,
        feedback: data.feedback,
        language: data.language,
        vocabularyFinal: data.levels.vocabulary.final,
        vocabularyTarget: data.levels.vocabulary.target,
        vocabularyInitial: data.levels.vocabulary.initial,

        pronunciationFinal: data.levels.pronunciation.final,
        pronunciationTarget: data.levels.pronunciation.target,
        pronunciationInitial: data.levels.pronunciation.initial,

        grammarFinal: data.levels.grammar.final,
        grammarTarget: data.levels.grammar.target,
        grammarInitial: data.levels.grammar.initial,

        speakingFinal: data.levels.conversation.final,
        speakingTarget: data.levels.conversation.target,
        speakingInitial: data.levels.conversation.initial,

        listeningFinal: data.levels.listening.final,
        listeningTarget: data.levels.listening.target,
        listeningInitial: data.levels.listening.initial,
      }
    });
    return updatedForm;

}

const findOneByFormId = async (formId) => {
  const getForm = await prisma.studentProgressReportEntry.findUnique({where: {id: formId}});
  return getForm;
}

const findAll = async (studentId) =>{
  if(studentId === "teacherId"){
    const getForm = await prisma.studentProgressReportEntry.findMany({where: {studentId: studentId}});
    return getForm;
  } else if(studentId === "studentId"){
    const getForm = await prisma.studentProgressReportEntry.findMany({where: {studentId: studentId}});
    return getForm;
  } else {
    return [];
  }

}
// Update
const edit = async (formId) => {

}

const remove = async (formId) => {

}
module.exports = {
    create, editAll, findAll, findOneByFormId
}