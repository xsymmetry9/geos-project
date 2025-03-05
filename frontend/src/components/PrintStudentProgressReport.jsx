import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Graph from "./Graph";
import RenderLogo from "./Image/RenderLogo";
import {
  TitleSPR,
  StudentInfo,
  AttendanceInfo,
  Table,
  Comment,
  Signature,
} from "./PrintSPR/StudentInfo";
import PlotCards from "./PrintSPR/PlotCards";
import "../styles/print.scss";

const PrintContent = ({ parsedData }) => {
  const { language } = useParams();
  const { name, textbook, course, attendance, totalLessons, feedback, levels } = parsedData;

  return (
    <>
      <div className="title-container">
        <div className="img-container">
          <RenderLogo style="logoName" description="logo" />
          <TitleSPR language={language} />
        </div>
      </div>
      <div className="even-columns">
        <StudentInfo name={name} textbook={textbook} course={course} language={language} />
        <AttendanceInfo attendance={attendance} totalLessons={totalLessons} language={language} />
      </div>
      <Table levels={levels} language={language} />
      <div className="graph-levelInfo">
        <div className="comment-signature-container">
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
