import {
  readStudent,
  createStudent,
  updateStudent,
  getTeacherStudentsByEmail,
  deleteById,
} from "../services/teacherService.js";

export const createStudentTeacherByEmail = async (req, res) => {
  try {
    const user = req.data;
    const data = req.body;
    const obj = {
      teacherEmail: user.email,
      name: data.name,
      nickname: data.nickname,
      email: data.email,
    };

    const result = await createStudent(obj);
    return res.send({
      status: true,
      user,
      message: "Student created",
      data: result,
    });
  } catch (err) {
    return res.send({
      status: false,
      user: req?.data || null,
      message: "Failed to create a student",
    });
  }
};

export const readStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await readStudent(id);
    res.send({ status: true, data: result, message: "Success!" });
  } catch (err) {
    console.log(err);
    res.send({
      status: false,
      data: null,
      message: "There was an error in the backend",
    });
  }
};

export const readTeacherStudentByEmail = async (req, res) => {
  try {
    const { email } = req.data;
    const result = await getTeacherStudentsByEmail(email);
    res.send({ status: true, user: req.data, data: result });
  } catch (err) {
    console.log(err);
    res.send({ status: false, data: null, error: err });
  }
};

export const updateStudentById = async (req, res) => {
  try {
    const obj = req.body;
    const result = await updateStudent(obj);
    res.send({ status: true, message: "Success", data: result });
  } catch (err) {
    console.log(err);
    res.send({ status: false, error: err });
  }
};

export const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const result = await deleteById(id);

    return res.send({
      status: true,
      message: "Successfully deleted the student",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: false,
      message: "Failed to delete in the backend",
    });
  }
};
