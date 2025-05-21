// ./services/adminService.js

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt =require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

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

    return result;
}

const getTeacherById =  async(id) =>{
    const result = await prisma.teacher.findUnique({where: {id: id } });
    return result;
}
const getTeacherByEmail = async (email) => {
    const result = await prisma.teacher.findUnique({where: {email: email}});
    return result;
}
const create = async (obj) => {
    const {name, email, password, language} = obj;

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await prisma.teacher.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            language: language
        },
    });

    return result;
}

module.exports = {
    verifyAdminCredentials,
    getTeachersFromDb, 
    getTeachersByLanguage, 
    getTeacherByEmail,
    getTeacherById,
    create};