const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');

const create = async (req, res) =>  {
    const studentId = req.body.studentId;
    const student = await prisma.student.findUnique({
        where: {id: studentId},
        include: {
            teachers: {
                include: {teacher: true}
            }
        }
    });
    const teacher = student.teachers[0].teacher;


    const entry = await prisma.levelCheckEntry.create({
        data: {
            studentId,
            teacherEmail: student.teachers[0].teacherEmail,
            name: student.name || "",
            language: teacher.language,
            teacherName: teacher.name,
            bookRecomendation: "",
            overallCEFR: "",

            speakingNameEntry: "",
            speakingScore: "",
            confidenceName_entry: "",
            confidenceScore: "",
            vocabularyEntry: "",
            vocabularyScore: "",
            grammarNameEntry: "",
            grammarScore: "",
            listeningNameEntry: "",
            listeningScore: "",
            pronunciationNameEntry: "",
            pronunciationScore: "",
            feedback : "",

        }
    });

    console.log("Entry is: ", entry);

    const categories = [
        "speaking",
        "confidence",
        "vocabulary",
        "grammar", 
        "listening",
        "pronunciation",
    ];

    const seedRows = categories.flatMap((cat) => {[
        {
            levelCheckEntryId: entry.id,
            category: cat,
            type: "strength",
            description: "This is a strength"
        },
        {
            levelCheckEntryId: entry.id,
            category: cat,
            type: "weakness",
            description: "This is a weakness"
        },
    ]});

    console.log(seedRows);

    await prisma.strengthWeakness.createMany({
        data: seedRows,
    })

    const finalResult = await prisma.levelCheckEntry.findUnique({
        where: { id: entry.id},
        include: {strengthWeaknesses: true}
    });

    console.log("The final result is:", finalResult);

    return finalResult;


}
const findOneByFormId = async (req, res) =>  {

}
const findAll = async (req, res) =>  {

}
const remove = async (req, res) =>  {

}
const editAll = async (req, res) =>  {

}

module.exports = {
    create, editAll, findAll, findOneByFormId, remove
}