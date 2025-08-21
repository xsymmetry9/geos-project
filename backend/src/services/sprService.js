import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

export const create = async (req) => {
  const studentId = req.body.studentId;
  const teacherEmail = req?.data?.email;

  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      teachers: {
        include: { teacher: true },
      },
    },
  });

  console.log(student);

  if (!student || student.teachers.length === 0) {
    console.error("Student or associated teacher not found");
    return;
  }

  const checkIfTeacher = await prisma.studentTeacher.findFirst({
    where: { teacherEmail: teacherEmail },
  });

  if (!checkIfTeacher) {
    console.error(`Teacher ${teacherEmail} is not assigned to student ${studentId}`);
    return;
  }

  console.log(checkIfTeacher);

  const createEmptyForm = await prisma.studentProgressReportEntry.create({
    data: {
      studentId,
      teacherEmail,
      studentName: student.name,
      language: "",
      course: "",
      textbook: "",
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
      pronunciationFinal: "",
    },
  });

  if (!createEmptyForm) {
    console.error("Error creating SPR entry");
    return;
  }

  return createEmptyForm;
};

export const editAll = async (formId, data) => {
  const updatedForm = await prisma.studentProgressReportEntry.update({
    where: { id: formId },
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
    },
  });

  return updatedForm;
};

export const findOneByFormId = async (formId) => {
  const getForm = await prisma.studentProgressReportEntry.findUnique({
    where: { id: formId },
  });

  console.log(formId);
  return getForm;
};

export const findAll = async (studentId) => {
  if (studentId === "teacherId" || studentId === "studentId") {
    return await prisma.studentProgressReportEntry.findMany({
      where: { studentId },
    });
  }

  return [];
};

export const remove = async (formId) => {
  const result = await prisma.studentProgressReportEntry.delete({
    where: { id: formId },
  });

  return result;
};

// Placeholder for edit
export const edit = async (formId) => {
  // implement logic later
};
