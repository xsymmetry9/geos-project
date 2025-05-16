const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

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

const getTeacherByEmail = async (email) => {
    const result = await prisma.teacher.findUnique({where: {email: email}});
    return result;
}

module.exports = {
    verifyAdminCredentials,
    getTeachersFromDb, 
    getTeachersByLanguage, 
    getTeacherByEmail};