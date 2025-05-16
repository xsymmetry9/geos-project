const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a teacher
  const createFirstTeacher = await prisma.teacher.create({
    data: {
      email: 'Nikita@geos.com',
      password: 'password123',
      name: 'Nikita',
      language: 'Japanese',
    }
  });
    const createSecondTeacher = await prisma.teacher.create({
    data: {
      email: 'SoYoung@geos.com',
      password: 'password123',
      name: 'So Young',
      language: 'Korean',
    }

  });
    const createThirdTeacher = await prisma.teacher.create({
    data: {
      email: 'OngWu@geos.com',
      password: 'password123',
      name: 'Ong',
      language: 'Chinse',
    }

  });
    const createFourthTeacher = await prisma.teacher.create({
    data: {
      email: 'Caleb@geos.com',
      password: 'password123',
      name: 'Caleb',
      language: 'English',
    }

  });
    const createFifthTeacher = await prisma.teacher.create({
    data: {
      email: 'Sample@geos.com',
      password: 'password123',
      name: 'Sample',
      language: 'English',
    }

  });


  console.log("Created a teacher: ", createFirstTeacher);
  console.log("Created a teacher: ", createSecondTeacher);
  console.log("Created a teacher: ", createThirdTeacher);
  console.log("Created a teacher: ", createFourthTeacher);
  console.log("Created a teacher: ", createFifthTeacher);



  // Create an entry with skills linked to that teacher

  // const teacherEmail = 'teacher@example.com';

  // Find the teacher by email

  // const teacher = await prisma.teacher.findUnique({
  //   where: {email: teacherEmail},
  // });

  // if(!teacher) {
  //   console.error(`Teacher with email ${teacherEmail} not found`);
  //   return;
  // }

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
