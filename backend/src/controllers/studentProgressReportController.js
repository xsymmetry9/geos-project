const {create, findOneByFormId, findAll, remove, editAll} = require("../services/sprService");
// Create
const createStudentProgressReport = async (req, res) => { 
    try{
        const createForm = await create(req, res);
        res.send({status: true, message: "it worked!", data: createForm});
        return;

    } catch (error)
    {
        console.error("Error:", error);
        res.send({status: false, message: "It didn't work", error: error});
        return;
    }
}
// Read
const getStudentReport = async(req, res) => {
    try{
        const formID = req.params.formID
        const form = await findOneByFormId(formID);
        if(!form) {
            console.log(new Date(), form);

            return res.status(500).json({error: "Couldn't find form"});
        }

        return res.send(form);
    } catch (error) {
        return res.status(500).json({error: "Error on the server side"});

    }

}

const getAllStudentReportsByStudentID = async (req, res) => {
    try{
        const form = await findAll(req);
        return res.status(200).json(form);
    } catch (error) {
        return res.status(500).json({error: "Error on the server side"});
    }
}

// Update

const updateAllDataStudentReportByFormID = async (req, res) => {
    try{
        //Checks if formId exist

        const data = req.body.data;
        const {formId} = req.body.data;

        const existForm = await findOneByFormId(formId)
        if(!existForm) {
            throw new Error("It doesn't exist");
        } 
        
        const updatedData = await editAll(formId, data);

        console.log(updatedData);
    

        // return res.status(200).json(form);

        return res.status(200).json(updatedData);
    } catch(error) {
        return res.status(500).json({error:"Error on the server side"});
    }
}

const deleteFormByFormID = async (req, res) => {
    const formId = req.params.formID;
    try {
        const deleted = await remove(formId);
        console.log(deleted);
        return res.status(204).json({message: "deleted"});
    } catch (error) {
        return res.status(500).json({error: "Error on the server side"});
    }
}

module.exports = {
    createStudentProgressReport, getStudentReport, getAllStudentReportsByStudentID, updateAllDataStudentReportByFormID, deleteFormByFormID
}