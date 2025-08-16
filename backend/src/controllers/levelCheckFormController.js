const {create, findOneByFormId, findAll, remove, editAll} = require("../services/levelCheckService");

const createLevelCheckForm = async (req, res) => {
    try{
        const result = await create(req, res);
        console.log(result);
        res.send({status: true, message: "It worked!", data: result});

    } catch (error) {
        return res.status(500).json({error: "Couldn't create form"});
    }
    return;
}
const getLevelCheckReport = async (req, res) => {
    try{

        const data = await findOneByFormId(req, res);

        return res.status(200).json({message: "Went through", data: data});

    } catch (error) {
        return res.status(500).json({error: "Error in the backend"});
    }
}
const updateAllDataLevelcheckFormByFormID = async (req, res) => {
    try{

        const result = await editAll(req, res);
        return res.send({status: true, message: "Uploaded", data: result});

    } catch (error) {
        return res.status(500).json({error: "Error in the backend"});
    }
}
const deleteLevelCheckByFormID = async (req, res) => {
    
    try{
        const result = await remove(req, res);
        return res.send({data: result});
        // return res.send({status: true, message:"Deleted", data: result});

    } catch (error) {
        return res.status(500).json({error: "Error in the backend"});
    }
}

module.exports = {
    createLevelCheckForm, getLevelCheckReport, updateAllDataLevelcheckFormByFormID, deleteLevelCheckByFormID
}