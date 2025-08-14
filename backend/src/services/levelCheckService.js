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
            bookRecommendation: "",
            overallCEFR: "",

            speakingNameEntry: "",
            speakingScore: null,
            confidenceNameEntry: "",
            confidenceScore: null,
            vocabularyNameEntry: "",
            vocabularyScore: null,
            grammarNameEntry: "",
            grammarScore: null,
            listeningNameEntry: "",
            listeningScore: null,
            pronunciationNameEntry: "",
            pronunciationScore: null,
            feedback : "",

        }
    });

    return entry;

    // const categories = [
    //     "speaking",
    //     "confidence",
    //     "vocabulary",
    //     "grammar", 
    //     "listening",
    //     "pronunciation",
    // ];

    // const seedRows = categories.flatMap((cat) => {[
    //     {
    //         levelCheckEntryId: entry.id,
    //         category: cat,
    //         type: "strength",
    //         description: "This is a strength"
    //     },
    //     {
    //         levelCheckEntryId: entry.id,
    //         category: cat,
    //         type: "weakness",
    //         description: "This is a weakness"
    //     },
    // ]});

    // console.log(seedRows);

    // await prisma.strengthWeakness.createMany({
    //     data: seedRows,
    // })

    // const finalResult = await prisma.levelCheckEntry.findUnique({
    //     where: { id: entry.id},
    //     include: {strengthWeaknesses: true}
    // });

    // console.log("The final result is:", finalResult);

    // return finalResult;


}
const findOneByFormId = async (req, res) =>  {
    const formId = req.params.formId;

    try{
        const fetchData = await prisma.levelCheckEntry.findUnique({
            where: {id: formId},
            include: {
                strengthsWeaknesses: true
            }
        })

        if(!fetchData) {
            return "Couldn't find entry";
        }
        return fetchData;
    } catch (error) {
        return "Failed to get data from db"
    }
}
const findAll = async (req, res) =>  {

}
const remove = async (req, res) =>  {

}
const editAll = async (req, res) =>  {
    const data = req.body.data;
    const formId = data.id;

    console.log(data);
    try{
        const updatedEntry = await prisma.levelCheckEntry.update({
            where: {id: formId},
            data: {
                name: data.student_name,
                feedback: data.feedback,
                bookRecommendation: data.bookRecommendation,
                overallCEFR: data.overallCEFR,
                createdAt: data.dateCreated,

                speakingNameEntry: data.speaking.level_name,
                speakingScore: data.speaking.score,
                confidenceNameEntry: data.confidence.level_name,
                confidenceScore: data.confidence.score,
                grammarNameEntry: data.grammar.level_name,
                grammarScore: data.grammar.score,
                vocabularyNameEntry: data.vocabulary.level_name,
                vocabularyScore: data.vocabulary.score,
                listeningNameEntry: data.listening.level_name,
                listeningScore: data.listening.score,
                pronunciationNameEntry: data.pronunciation.level_name,            }
        })

        return updatedEntry;
    } catch (error) {
        return error;
    }

}

module.exports = {
    create, editAll, findAll, findOneByFormId, remove
}