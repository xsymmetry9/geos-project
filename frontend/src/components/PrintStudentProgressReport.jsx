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

import "../styles/print.css"

  // Working on Transforming data
export const processData = (data) =>{
    return Object.keys(data).map((category) =>({
      category,
      initial: parseFloat(data[category].initial !== "10+" ? parseFloat(data[category].initial) : 10),
      target: parseFloat(data[category].target !== "10+" ? parseFloat(data[category].target) : 10),
      final: parseFloat(data[category].final !== "10+" ? parseFloat(data[category].final) : 10)
    }));
  };

export const PrintContent = ({ parsedData }) => {
  const { language } = useParams();
  const { name, textbook, course, attendance, totalLessons, feedback, levels } = parsedData;

  const transformedData = processData(parsedData.levels); 

  return (
    <>
      <div className="title-container">
        <div className="container">
          <img width={120} height={60} src={"/logo.svg"} alt = {"Company Logo"} />
          <TitleSPR language={language} />
        </div>
      </div>
      <div className="student-information">
        <StudentInfo name={name} textbook={textbook} course={course} language={language} />
        <AttendanceInfo attendance={attendance} totalLessons={totalLessons} language={language} />
      </div>
      <Table levels={levels} transformedData = {transformedData} language={language} />
      <div className="mt-[14px] grid grid-cols-2 gap-[12px]">
        <div className="grid grid-cols-1 gap-">
          <Graph userData={transformedData} language={language} />
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
