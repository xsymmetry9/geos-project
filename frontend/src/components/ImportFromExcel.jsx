import React, { useCallback, useState } from "react";
import { read, utils } from "xlsx";
import PropTypes from "prop-types";
import { Student, Levels } from "../type/Student";
import { editDataFromLocal, getDataFromLocal } from "../utils/functions";
import { Upload } from "lucide-react";

const ImportFromExcel = ({ userData, setUserData }) => {
  const { SPR } = userData;
  const [fileName, setFileName] = useState("");

  // Merge two arrays and filters the data
  const mergedArrayFilterUniqueObjects = useCallback((arr1, arr2) => {
    const mergedArray = [...arr1, ...arr2];
    const uniqueObjects = new Map();

    mergedArray.forEach((item) => {
      uniqueObjects.set(item.id, item);
    });
    return Array.from(uniqueObjects.values());
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = read(data, { type: "array" });

        const sheetname = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetname];
        const jsonData = utils.sheet_to_json(worksheet);

        const parsedStudents = jsonData.map((row) => {
          const student = new Student(row.id);
          student.name = row.Name || "";
          student.course = row.Course || "No course name";
          student.textbook = row.Textbook || "No textbook";
          student.attendance = Number(row.Attendance || 0);
          student.totalLessons = Number(row.TotalLessons || 0);
          student.feedback = row.Feedback || "No feedback";

          student.levels = {
            vocabulary: new Levels(
              Number(row.Vocabulary_initial),
              Number(row.Vocabulary_target),
              Number(row.Vocabulary_final)
            ),
            pronunciation: new Levels(
              Number(row.Pronunciation_initial),
              Number(row.Pronunciation_target),
              Number(row.Pronunciation_final)
            ),
            grammar: new Levels(
              Number(row.Grammar_initial),
              Number(row.Grammar_target),
              Number(row.Grammar_final)
            ),
            listening: new Levels(
              Number(row.Listening_initial),
              Number(row.Listening_target),
              Number(row.Listening_final)
            ),
            conversation: new Levels(
              Number(row.Conversation_initial),
              Number(row.Conversation_target),
              Number(row.Conversation_final)
            ),
          };
          return student;
        });
        // Update the state after removing all the duplicates
        const result = mergedArrayFilterUniqueObjects(parsedStudents, SPR);
        setUserData((prev) => ({ ...prev, SPR: result }));

        // Save to Local storage
        const dataFromLocal = JSON.parse(getDataFromLocal());
        const newData = { ...dataFromLocal, SPR: result };

        editDataFromLocal(newData);
      } catch (err) {
        alert(err.message);
      }
    };
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="file-upload" className="btn-primary flex items-center justify-center">
        <Upload size={18} className="mr-2" /> Upload File
        <input
          id="file-upload"
          className="hidden"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
      />
      </label>
      {fileName && <p>Uploaded: {fileName}</p>}
    </div>
  );
};

ImportFromExcel.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
};

export default ImportFromExcel;
