// This is to play around with Prisma

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  const createForm = (obj) => {
    const {studentId} = obj;
    console.log(studentId);


  }

  const readForm = () => {

  }

  const updateForm = () => {

  }

  const deleteForm = () => {

  }

  createForm({studentId: "d22097a7-4bcb-4e3c-bb8b-5a57fa7e3981"});

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
