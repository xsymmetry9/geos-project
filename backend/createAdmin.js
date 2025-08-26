import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { PrismaClient } from('@prisma/client');
const prisma = new PrismaClient();

async function seedAdmin() {
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be set in environment variables");
  }

  const exists = await prisma.admin.findUnique({ where: { name: ADMIN_USERNAME } });

  if(exists) {
    console.log('Admin already exists, skipping creation.');
    return;
  }

  const passwordHash = bcrypt.hashSync(ADMIN_PASSWORD, 12);

  await prisma.admin.create({
    data: {
      name: ADMIN_USERNAME,
      password: passwordHash,
    },
  });

  console.log('Created an admin');
}

seedAdmin()
  .catch((e) => {
    console.error("Admin seed failed:", e);
    process.exitCode(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit();
  });
