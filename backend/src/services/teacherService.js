import dotenv from 'dotenv';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

export const getTeacherStudentsByEmail = async (email) => {
  const result = await prisma.studentTeacher.findMany({
    where: { teacherEmail: email },
    include: {
      student: {
        include: {
          studentProgressReportEntry: true,
          levelCheckEntries: true,
        },
      },
    },
  });

  if (!result || result.length === 0) {
    console.log("No students found");
    return [];
  }

  return result.map((item) => item.student);
};

export const createStudent = async (obj) => {
  const { teacherEmail, email, name, nickname } = obj;
  const result = await prisma.student.create({
    data: {
      id: crypto.randomUUID(),
      email,
      name,
      nickname,
      teachers: {
        create: [
          {
            teacher: { connect: { email: teacherEmail } },
          },
        ],
      },
    },
    include: {
      teachers: { include: { teacher: true } },
    },
  });

  if (!result) {
    console.error("Failed to create");
    return;
  }

  return result;
};

export const updateStudent = async (obj) => {
  const { name, nickname, email } = obj;
  const result = await prisma.student.update({
    where: { id: obj.id },
    data: {
      name,
      nickname,
      email,
    },
  });
  return result;
};

export const readStudent = async (studentId) => {
  const result = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      studentProgressReportEntry: true,
      levelCheckEntries: true,
    },
  });
  return result;
};

export const deleteById = async (studentId) => {
  const result = await prisma.student.delete({
    where: { id: studentId },
  });
  return result;
};
