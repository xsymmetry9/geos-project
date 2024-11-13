const  {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

class User {
    static async getUsers(){
        const users = await prisma.user.findMany();
        return users;
    }
}

module.exports = User;