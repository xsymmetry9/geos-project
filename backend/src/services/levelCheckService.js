const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

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
}
const findOneByFormId = async (req, res) =>  {
    const formId = req.params.formId;

    const fetchData = await prisma.levelCheckEntry.findUnique({
        where: {id: formId},
            include: {
                strengthsWeaknesses: true
                }
        });
    return fetchData;
}
const findAll = async (req, res) =>  {

}
const remove = async (req, res) =>  {

    const formId = req.params.formId;
    console.log(formId);

    const checkIfExist = await prisma.levelCheckEntry.findUnique({
        where: {id: formId}
    });

    if(checkIfExist){
        const deleted = await prisma.levelCheckEntry.delete({
        where: {id: formId}
        });
        console.log(deleted);
        return deleted;
    }

    // console.log(deleted);

    return null;

}
const editAll = async (req, res) =>  {
    const data = req.body.data;
    const formId = data.id;

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
                pronunciationNameEntry: data.pronunciation.level_name,
                pronunciationScore: data.pronunciation.score,            
            }
        })

        const cats = ["speaking", "confidence", "grammar", "vocabulary", "listening","pronunciation"];
        
        await prisma.strengthWeakness.deleteMany({
            where: {levelCheckEntry: {id: formId}}
        });
        cats.forEach((cat) => {
     
            if(data[cat].strength.length != 0);
            {
                data[cat].strength.forEach(async (description) => {
                    await prisma.strengthWeakness.create({
                        data:{
                            levelCheckEntry: {connect: {id: formId}},
                            category: cat,
                            type: "strength",
                            description: description
                        }
                    });
                });
            }

            if(data[cat].weakness.length != 0)
            {
                data[cat].weakness.forEach(async (description) => {
                    await prisma.strengthWeakness.create({
                        data:{
                            levelCheckEntry: {connect: {id: formId}},
                            category: cat,
                            type: "weakness",
                            description: description
                        }
                    });
                });
            }
        });

        console.log(updatedEntry);

        return updatedEntry;

}

module.exports = {
    create, editAll, findAll, findOneByFormId, remove
}