import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Graph from "./Graph";
import {
  TitleSPR,
  StudentInfo,
  AttendanceInfo,
  Table,
  Comment,
  Signature,
} from "./PrintSPR/StudentInfo";
import PlotCards from "./PrintSPR/PlotCards";

const PrintContent = ({ parsedData }) => {
  const { language } = useParams();
  const { name, textbook, course, attendance, totalLessons, feedback, levels } = parsedData;

  return (
    <>
      <div className="w-full pb-3">
        <div className="flex flex-col justify-center items-center gap-1">
          <img width={120} height={60} src={"/logo.svg"} alt = {"Company Logo"} />
          <TitleSPR language={language} />
        </div>
      </div>
      <div className="grid grid-cols-2 pb-3">
        <StudentInfo name={name} textbook={textbook} course={course} language={language} />
        <AttendanceInfo attendance={attendance} totalLessons={totalLessons} language={language} />
      </div>
      <Table levels={levels} language={language} />
      <div className="mt-[14px] grid grid-cols-2 gap-[12px]">
        <div className="grid grid-cols-1 gap-">
          <Graph data={parsedData} language={language} />
          <Comment comment={feedback} language={language} />
          <Signature language={language} />
        </div>
        <PlotCards levels={levels} language={language} />
      </div>
    </>
  );
};

PrintContent.propTypes = {
  parsedData: PropTypes.object,
};

export default PrintContent;
