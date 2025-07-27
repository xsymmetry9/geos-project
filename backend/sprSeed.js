// This is to play around with Prisma

const { PrismaClient } = require('@prisma/client');
const { findAll } = require('./src/services/sprService');
const prisma = new PrismaClient();

async function main() {

  const createForm = async (obj) => {
    const {studentId, teacherEmail} = obj;
    console.log(studentId);

    const student = await prisma.student.findUnique({
      where: {id: studentId},
      include: {
        teachers: {
          include: {teacher: true}
        }
      }
    });

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

    const result = await prisma.studentProgressReportEntry.create({
      data:{
        studentName: student.name,
        language: "English",
        course: "SGL",
        textbook: "English File 4",
        attendance: 10,
        totalLessons: 12,
        feedback: "Great work ethic.  Always practiced her vocabulary in every class.  She has improved alot and she did it only in 3 months!!",
        vocabularyInitial: "3",
        vocabularyTarget: "6.0",
        vocabularyFinal: "5.0",

        grammarInitial: "3.0",
        grammarTarget: "6.0",
        grammarFinal: "4.0",

        listeningInitial: "3.0",
        listeningTarget: "6.0",
        listeningFinal: "5.0",

        speakingInitial: "3.0",
        speakingTarget: "6.0",
        speakingFinal: "5.5",

        pronunciationInitial: "3.0",
        pronunciationTarget: "6.0",
        pronunciationFinal: "5.5",

        teacherEmail: teacherEmail,
        studentId: studentId
      },
    });
    return result;
  }

  const readForm = async ({formId}) => {

    try{
       const result = await prisma.studentProgressReportEntry.findUnique({
        where: {id: formId}
      });

      if(!result) {
        console.error("Invalid form Id");
        return;
      }
      console.log("Found form:", result);
      return;
    } catch (error) {
      console.error("Error reading form: ", error);
      return;
    }
  }

  const readAllByStudentId = async (studentId) =>{
    try{
      const result = await prisma.studentProgressReportEntry.findMany({
        where: {studentId: studentId}
      });

      console.log("Successfully delete all by student ID: ", result);
      return result;
      
    } catch(error){
      console.error("Failed to look up student ID:", error);
    }
  }

  const updateForm = () => {

  }

  const deleteForm = async ({formId}) => {

    try{
      const result = await prisma.studentProgressReportEntry.delete({
        where: {id: formId}
      });

      if(!result) {
        console.error("Invalid form Id");
        return;
      }

      console.log("Form was found and deleted", result);
      return;

    } catch (error){

      console.error("Error deleting form: ", error);

    }
  }

  const deleteAllByStudentId = async(studentId) => {
    try{
      const deleteAll = await prisma.studentProgressReportEntry.deleteMany({
        where: {studentId: studentId}
      });
      console.log("Succesfully deleted Student", deleteAll);
      console.log("This is the new list:", readAllByStudentId(studentId));
      return result;

    } catch (error) {
      console.error("Can't find student ID", error);
    }
  }

  // createForm({studentId: "d22097a7-4bcb-4e3c-bb8b-5a57fa7e3981", teacherEmail: "geos@gmail.com" });
  // const plot = createForm({studentId: "ad1e4989-13ad-4454-a5d7-d59e8605424e", teacherEmail: "geos@gmail.com" });
  // console.log(plot);
  // const formId = "bd7b7bd6-b1a6-4451-8587-e687f1ab58e9"
  // readForm({formId: formId});
  // deleteForm({formId: formId});

  const studentId = "d22097a7-4bcb-4e3c-bb8b-5a57fa7e3981";
  // readAllByStudentId(studentId);
  deleteAllByStudentId(studentId);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
