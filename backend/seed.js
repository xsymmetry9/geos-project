const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  const teacher = await prisma.teacher.findUnique({
    where: {email: 'geos@gmail.com'},
  });

  if(!teacher){
    throw new Error('Teachers not found');
  }

  const student = await prisma.student.create({
    data:{
    id: crypto.randomUUID(),
    email: 'student@gmail.com.tw',
    name: 'Lin Xiao Yang',
    nickname: 'Linda',
    teachers: {
      create: [
        {
          teacher: {connect: {id: teacher.id}},
        },
      ],
    },
    },
    include: {
      teachers: {include: {teacher: true}},
    }
  });

  console.log('Student created with teacher', student);
  // Create a teacher
  // const createFirstTeacher = await prisma.teacher.create({
  //   data: {
  //     email: 'Nikita@geos.com',
  //     password: 'password123',
  //     name: 'Nikita',
  //     language: 'Japanese',
  //   }
  // });
 


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
