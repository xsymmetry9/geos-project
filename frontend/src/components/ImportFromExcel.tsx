import React, { useCallback } from "react";
import { read, utils } from "xlsx";
import { Student, Levels } from "../type/Student";
import { editDataFromLocal, getDataFromLocal } from "../utils/functions";
import { Files, Upload } from "lucide-react";
import User from "@/type/User";

type ImportFromExcelProps = {
  userData: User,
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}
const ImportFromExcel: React.FC<ImportFromExcelProps> = ({ userData, setUserData }) => {
  const { SPR } = userData;

  // Merge two arrays and filters the data
  const mergedArrayFilterUniqueObjects = useCallback((arr1: Student[], arr2: Student[]) => {
    const mergedArray = [...arr1, ...arr2];
    const uniqueObjects = new Map<string, Student>();

    mergedArray.forEach((item) => {
      uniqueObjects.set(item.id, item);
    });
    return Array.from(uniqueObjects.values());
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      try {
        const arrayBuffer = event.target?.result;
        if(!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) return;

        const data = new Uint8Array(arrayBuffer);
        const workbook = read(data, { type: "array" });

        const sheetname = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetname];
        const jsonData: any[] = utils.sheet_to_json(worksheet);

        const parsedStudents: Student[] = jsonData.map((row) => {
          const student = new Student(row.id);

          student.name = row.Name || "";
          student.course = row.Course || "No course name";
          student.textbook = row.Textbook || "No textbook";
          student.attendance = Number(row.Attendance || 0);
          student.totalLessons = Number(row.TotalLessons || 0);
          student.feedback = row.Feedback || "No feedback";

          student.levels = {
            vocabulary: new Levels(
              String(row.Vocabulary_initial),
              String(row.Vocabulary_target),
              String(row.Vocabulary_final)
            ),
            pronunciation: new Levels(
              String(row.Pronunciation_initial),
              String(row.Pronunciation_target),
              String(row.Pronunciation_final)
            ),
            grammar: new Levels(
              String(row.Grammar_initial),
              String(row.Grammar_target),
              String(row.Grammar_final)
            ),
            listening: new Levels(
              String(row.Listening_initial),
              String(row.Listening_target),
              String(row.Listening_final)
            ),
            conversation: new Levels(
              String(row.Conversation_initial),
              String(row.Conversation_target),
              String(row.Conversation_final)
            ),
          };
          return student;
        });
        // Update the state after removing all the duplicates
        const result = mergedArrayFilterUniqueObjects(parsedStudents, SPR);
        setUserData((prev) => ({ ...prev, SPR: result }));

        // Save to Local storage
        const dataFromLocal = getDataFromLocal();
        const newData = { ...dataFromLocal, SPR: result };

        editDataFromLocal(newData);
      } catch (err: any) {
        alert(err.message || "An error occurred during fild upload");
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
    </div>
  );
};

export default ImportFromExcel;
