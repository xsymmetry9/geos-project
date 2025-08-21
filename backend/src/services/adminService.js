import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

export const verifyAdminCredentials = async (name, password) => {
  const admin = await prisma.admin.findUnique({ where: { name } });
  if (!admin) return false;

  // Compare plaintext password with hashed password
  const match = await bcrypt.compare(password, admin.password);
  return match;
};

export const getTeachersFromDb = async () => {
  const result = await prisma.teacher.findMany();
  return result;
};

export const getTeachersByLanguage = async (language) => {
  const result = await prisma.teacher.findMany({ where: { language } });
  return result;
};

export const getTeacherById = async (id) => {
  const result = await prisma.teacher.findUnique({ where: { id } });
  return result;
};

export const getTeacherByEmail = async (email) => {
  const result = await prisma.teacher.findUnique({ where: { email } });
  return result;
};

export const create = async (obj) => {
  const { name, email, password, language } = obj;

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await prisma.teacher.create({
    data: {
      name,
      email,
      password: hashedPassword,
      language,
    },
  });

  return result;
};
