import {
  create,
  findOneByFormId,
  findAll,
  remove,
  editAll,
} from "../services/sprService.js";

// Create
export const createStudentProgressReport = async (req, res) => {
  try {
    const createForm = await create(req, res);
    res.send({ status: true, message: "it worked!", data: createForm });
  } catch (error) {
    console.error("Error:", error);
    res.send({ status: false, message: "It didn't work", error });
  }
};

// Read - single form
export const getStudentReport = async (req, res) => {
  try {
    const formID = req.params.formID;
    const form = await findOneByFormId(formID);
    if (!form) {
      console.log(new Date(), form);
      return res.status(500).json({ error: "Couldn't find form" });
    }

    return res.send(form);
  } catch (error) {
    return res.status(500).json({ error: "Error on the server side" });
  }
};

// Read - all forms for student
export const getAllStudentReportsByStudentID = async (req, res) => {
  try {
    const form = await findAll(req);
    return res.status(200).json(form);
  } catch (error) {
    return res.status(500).json({ error: "Error on the server side" });
  }
};

// Update form
export const updateAllDataStudentReportByFormID = async (req, res) => {
  try {
    const data = req.body.data;
    const { formId } = req.body.data;

    const existForm = await findOneByFormId(formId);
    if (!existForm) {
      throw new Error("It doesn't exist");
    }

    const updatedData = await editAll(formId, data);
    return res.status(200).json(updatedData);
  } catch (error) {
    return res.status(500).json({ error: "Error on the server side" });
  }
};

// Delete form
export const deleteFormByFormID = async (req, res) => {
  const formId = req.params.formID;
  try {
    const deleted = await remove(formId);
    console.log(deleted);
    return res.status(204).json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Error on the server side" });
  }
};
