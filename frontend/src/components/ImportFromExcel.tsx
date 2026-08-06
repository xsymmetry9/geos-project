import React, { useCallback } from "react";
import { read, utils } from "xlsx";
import { Student, Levels } from "@/type/Student";
import { LevelCheckEntry } from "@/type/LevelCheckForm";
import { editDataFromLocal, getDataFromLocal } from "@/utils/functions";
import { Upload } from "lucide-react";
import User from "@/type/User";

type Category =
  | "confidence"
  | "speaking"
  | "listening"
  | "grammar"
  | "pronunciation"
  | "vocabulary";

type ImportFromExcelProps = {
  userData: User;
  className?: string;
};

const ParseLevelCheckEntry = (sheet: any) => {
  const jsonData: any[] = utils.sheet_to_json(sheet);

  const entries: LevelCheckEntry[] = [];
  jsonData.forEach((row) => {
    const entry = new LevelCheckEntry();
    entry.id = row.id;
    entry.student_name = row.student_name;
    entry.bookRecommendation = row.bookRecommendation;
    entry.feedback = row.feedback;
    entry.overallCEFR = row.overallCEFR;
    entry.dateCreated = row.dateCreated;

    const categories: Category[] = [
      "confidence",
      "speaking",
      "listening",
      "grammar",
      "pronunciation",
      "vocabulary",
    ];
    categories.forEach((cat: Category) => {
      const category = entry[cat];
      category.level_name = row[`${cat}_level`];
      category.score = row[`${cat}_score`];
      row[`${cat}_strengths`].split("; ").forEach((item: any) => category.strength.push(item));
      row[`${cat}_weakness`].split("; ").forEach((item: any) => category.weakness.push(item));
    });
    entries.push(entry);
  });

  return entries;
};

const parseSPREntry = (sheet: any) => {
  const jsonData: any[] = utils.sheet_to_json(sheet);
  console.log(jsonData);

  const students: Student[] = [];
  jsonData.forEach((row) => {
    const student = new Student(row.id);
    student.dateCreated = row.Date || "";
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
    students.push(student);
  });
  return students;
};

const ImportFromExcel: React.FC<ImportFromExcelProps> = ({ userData, className }) => {
  const mergedArrayFilterUniqueObjects = useCallback((arr1: any[], arr2: any[]) => {
    const mergedArray = [...arr1, ...arr2];
    const uniqueObjects = new Map<string, any>();
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

        if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) return;

        const data = new Uint8Array(arrayBuffer);
        const workbook = read(data, { type: "array" });
        const sheetNames = workbook.SheetNames;

        const current = getDataFromLocal() ?? userData;
        const updatedUser = Object.assign(new User(), current);
        const SPR = updatedUser.SPR ?? [];
        const levelCheck = updatedUser.levelCheck ?? [];

        sheetNames.forEach((sheetName) => {
          if (sheetName === "Teacher's data" || sheetName === "spr") {
            const worksheet = workbook.Sheets[sheetName];
            const parsedData = parseSPREntry(worksheet);
            updatedUser.SPR = mergedArrayFilterUniqueObjects(parsedData, SPR);
          } else if (sheetName === "Level Check") {
            const worksheet = workbook.Sheets[sheetName];
            const parsedData = ParseLevelCheckEntry(worksheet);
            updatedUser.levelCheck = mergedArrayFilterUniqueObjects(parsedData, levelCheck);
          }
        });

        editDataFromLocal(updatedUser);
        window.location.reload();
      } catch (err: any) {
        alert(err.message || "An error occurred during file upload");
      }
    };
  };

  return (
    <label
      htmlFor="file-upload"
      className={
        className ??
        "flex cursor-pointer items-center justify-center"
      }
    >
      <span className="inline-flex items-center gap-2">
        <Upload size={16} />
        Upload
      </span>
      <input
        id="file-upload"
        className="hidden"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
    </label>
  );
};

export default ImportFromExcel;
