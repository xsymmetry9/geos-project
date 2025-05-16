const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

const verifyAdminCredentials = async (name, password) =>{
    const admin = await prisma.admin.findUnique({ where: {name: name}})
    if(!admin) return false;

    const match = password === admin.password ? true : false ;

    return match;
}

const getTeachersFromDb = async () =>{
    const result = await prisma.teacher.findMany();

    return result;
}

const getTeachersByLanguage = async (language) =>{
    const result = await prisma.teacher.findMany({where: {language: language}});
    console.log(result);

    return result;
}

module.exports = {verifyAdminCredentials, getTeachersFromDb, getTeachersByLanguage};