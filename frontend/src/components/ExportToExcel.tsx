import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DownloadIcon } from "lucide-react";
import { LevelCheckEntry } from "@/type/LevelCheckForm";
import User from "@/type/User";
import { getDataFromLocal } from "@/utils/functions";

type ExportToExcelProps = {
  userData: User;
  className?: string;
};

type CategoryKey =
  | "speaking"
  | "confidence"
  | "grammar"
  | "vocabulary"
  | "listening"
  | "pronunciation";

const CATEGORY_KEYS: CategoryKey[] = [
  "speaking",
  "confidence",
  "grammar",
  "vocabulary",
  "listening",
  "pronunciation",
];

const exportSPR = (spr: any) => {
  const data = spr.map((item: any) => ({
    id: item.id,
    Name: item.name,
    Date: item.dateCreated,
    Course: item.course,
    Textbook: item.textbook,
    Attendance: item.attendance,
    TotalLessons: item.totalLessons,
    Vocabulary_initial: item.levels.vocabulary.initial,
    Vocabulary_target: item.levels.vocabulary.target,
    Vocabulary_final: item.levels.vocabulary.final,
    Pronunciation_initial: item.levels.pronunciation.initial,
    Pronunciation_target: item.levels.pronunciation.target,
    Pronunciation_final: item.levels.pronunciation.final,
    Grammar_initial: item.levels.grammar.initial,
    Grammar_target: item.levels.grammar.target,
    Grammar_final: item.levels.grammar.final,
    Listening_initial: item.levels.listening.initial,
    Listening_target: item.levels.listening.target,
    Listening_final: item.levels.listening.final,
    Conversation_initial: item.levels.conversation.initial,
    Conversation_target: item.levels.conversation.target,
    Conversation_final: item.levels.conversation.final,
    Feedback: item.feedback,
  }));

  return data;
};

const arr = (a?: string[]) => (Array.isArray(a) ? a : []);
const joinArr = (a?: string[]) => arr(a).join("; ");

const exportLevelCheck = (levelCheck: LevelCheckEntry[]) => {
  return levelCheck.map((entry: any) => {
    const base = {
      id: entry.id,
      student_name: entry.student_name,
      feedback: entry.feedback,
      dateCreated: entry.dateCreated,
      bookRecommendation: entry.bookRecommendation,
      overallCEFR: entry.overallCEFR,
    } as Record<string, string | number>;

    CATEGORY_KEYS.forEach((k) => {
      const sec = (entry as any)[k] ?? {};
      base[`${k}_score`] = sec.score ?? "";
      base[`${k}_level`] = sec.level_name ?? "";
      base[`${k}_strengths`] = joinArr(sec.strength);
      base[`${k}_weakness`] = joinArr(sec.weakness);
    });

    return base;
  });
};

const autoFitColumns = (worksheet: XLSX.WorkSheet, data: any[]) => {
  if (!data || data.length === 0) return;

  const objectMaxLength: number[] = [];

  data.forEach((row) => {
    Object.values(row).forEach((val, colIdx) => {
      const strVal = val ? String(val) : "";
      objectMaxLength[colIdx] = Math.max(objectMaxLength[colIdx] || 10, strVal.length);
    });
  });

  worksheet["!cols"] = objectMaxLength.map((w) => ({ wch: w + 2 })); // +2 for padding
};

const ExportToExcel: React.FC<ExportToExcelProps> = ({ userData, className }) => {
  const handleExport = () => {
    const data = getDataFromLocal() ?? userData;
    const spr = data.SPR ?? [];
    const levelCheck = data.levelCheck ?? [];
    const haveSPR = spr.length > 0;
    const haveLC = levelCheck.length > 0;

    const workbook = XLSX.utils.book_new();

    if (!haveSPR && !haveLC) {
      alert("No data available to export.");
      return;
    }
    if (haveSPR) {
      const sprDataToExport = exportSPR(spr);
      const studentProgressReportSheet = XLSX.utils.json_to_sheet(sprDataToExport);
      autoFitColumns(studentProgressReportSheet, sprDataToExport);
      XLSX.utils.book_append_sheet(workbook, studentProgressReportSheet, "spr");
    }

    if (haveLC) {
      const levelCheckDataToExport = exportLevelCheck(levelCheck);
      const levelCheckReportSheet = XLSX.utils.json_to_sheet(levelCheckDataToExport);
      autoFitColumns(levelCheckReportSheet, levelCheckDataToExport);
      XLSX.utils.book_append_sheet(workbook, levelCheckReportSheet, "Level Check");
    }
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const stamp = new Date().toISOString().slice(0, 10);

    saveAs(blob, `backup data-${stamp}`);
  };
  return (
    <button
      type="button"
      className={
        className ??
        "flex cursor-pointer items-center justify-center gap-2"
      }
      onClick={handleExport}
    >
      <span className="inline-flex items-center gap-2">
        <DownloadIcon size={16} />
        Download
      </span>
    </button>
  );
};

export default ExportToExcel;
