// This is to play around with Prisma

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  const findTeacherByEmail = async (email) => {
    const result = await prisma.teacher.findUnique({where: {email: email}});

    if(!result){
    throw new Error('Teacher not found');
  }

    return result;
  } 
// -------------------------- Create Students ---------------------------------
  const create = async ({id, email, name, nickname, teacherEmail}) => {
    const result = await prisma.student.create({
    data: {
      id: !id ? crypto.randomUUID() : id,
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

// Read Students
  const readAllStudents = async (email) => {
    const result = await prisma.studentTeacher.findMany({where: {teacherEmail: email} });
    if(!result) {
      console.error("Invalid email");
      return;
    }

    return result;
  }

  const readStudentByEmail = async (email) => {
    const result = await prisma.student.findUnique({where: {email: email}})
    if(!result) {
      console.error("Failed to read student");
      return;
    }

    return result;
  }

  // Update Students
  const updateStudentByEmail = async (obj) => {
    const {email, fieldName, value} = obj
    const result = await prisma.student.update(
      {
        where: 
        {
          email: email
        },
        data: {
          [fieldName] : value
        },
        
      })
      return result;
  }
  // Delete Students
  const removeTeacherStudentsByEmail = async (email) => {
    const result = await prisma.studentTeacher.deleteMany({where: {teacherEmail: email}});

    if(!result){
      throw new Error("Unable to find teacher");
    }

    return result;
  }

  const deleteStudentByEmail = async (email) => {
    const result = await prisma.student.delete({where: {email: email}});
    if(!result) return "Error: failed to delete student";

    const studentTeacherResult = await removeTeacherStudentsByEmail(email);

    if(!studentTeacherResult) return "Error: failed to load teacher student relationship";

    return result;
  }


  // Result


  // console.log(await (removeStudentByEmail("student@gmail.com.tw")));

  // 1) --------------------------- Load Teacher --------------------------------------
  // const teacher = await findTeacherByEmail("geos@gmail.com");
  // console.log(teacher);

  // ------------------------------- 2) Create Student(s) -----------------------------

    // console.log(await create({
  //   email: 'jayZhou@gmail.com.tw',
  //   name: 'Zhou Jie Lun',
  //   nickname: 'Jay',
  //   teacherEmail: teacher.email,
  // }));  
  
  // 2) ---------------------------- Read Student -------------------------------------
  // console.log(await readAllStudents(teacher.email));

  // 3) ---------------------------- Update Student -------------------------------------
  // console.log(await updateStudentByEmail({email: "student@gmail.com.tw", fieldName: "email", value: "leikamkei@gmail.com.tw"}));


  // Create a teacher
  // const createFirstTeacher = await prisma.teacher.create({
  //   data: {
  //     email: 'Nikita@geos.com',
  //     password: 'password123',
  //     name: 'Nikita',
  //     language: 'Japanese',
  //   }
  // });
 

  // const newEntry = await prisma.entry.create({
  //   data:{
  //     type: 'SPR',
  //     student_name: "David",
  //     course: "PL",
  //     textbook: 'Textbook A',
  //     attendance: '8',
  //     totalLessons: '10',
  //     feedback: 'Great progress',
  //     teacherEmail: teacher.email,
  //     skills: {
  //       create: [
  //         { type: 'vocabulary', intial: '4.5', target: '6.0', final: '5.0' },
  //         { type: 'pronunciation', intial: '5.0', target: '6.5', final: '5.5' },
  //         { type: 'grammar', intial: '4.0', target: '6.0', final: '4.5' },
  //         { type: 'conversation', intial: '3.5', target: '5.5', final: '4.0' },
  //         { type: 'listening', intial: '5.5', target: '7.0', final: '6.0' },
          
  //       ],
  //     },
  //   },
  // });
  // console.log(`Create Entry ID: ${newEntry.id} for teacher ${teacher.name}`)


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
