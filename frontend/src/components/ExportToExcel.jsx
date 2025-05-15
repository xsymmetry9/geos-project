import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DownloadIcon } from "lucide-react";
import PropTypes from "prop-types";

const ExportToExcel = ({ userData }) => {
  const handleExport = () => {
    if (!userData || !userData.SPR || userData.SPR.length === 0) {
      alert("No data available to export.");
      return;
    }
    const dataToExport = userData.SPR.map((item) => ({
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

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teacher's data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "Teacher's backup data");
  };
  return (
    <>
      <button className="btn-primary flex gap-2 items-center justify-center" onClick={handleExport}>
        <DownloadIcon className="icon" size={18} />
        <span className="visually-hidden">to Excel</span>
      </button>
    </>
  );
};

ExportToExcel.propTypes = {
  userData: PropTypes.object,
};
export default ExportToExcel;
