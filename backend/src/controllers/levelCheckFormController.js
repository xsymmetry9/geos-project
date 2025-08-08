const {create, findOneByFormId, findAll, remove, editAll} = require("../services/levelCheckService");

const createLevelCheckForm = async (req, res) => {
    try{
        const result = await create(req, res);
        console.log(result);

        res.send({status: true, message: "It worked!"});

    } catch (error) {
        return res.status(500).json({error: "Error in the backend"});
    }
    return;
}
const getLevelCheckReport = async (req, res) => {
    try{

    } catch (error) {
        return res.status(500).json({error: "Error in the backend"});
    }
    return;
}
const updateAllDataLevelcheckFormByFormID = async (req, res) => {
    try{

    } catch (error) {
        return res.status(500).json({error: "Error in the backend"});
    }
    return;
}
const deleteLevelCheckByFormID = async (req, res) => {
    try{

    } catch (error) {
        return res.status(500).json({error: "Error in the backend"});
    }
    return;
}

module.exports = {
    createLevelCheckForm, getLevelCheckReport, updateAllDataLevelcheckFormByFormID, deleteLevelCheckByFormID
}