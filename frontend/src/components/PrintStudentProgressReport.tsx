import { useParams } from "react-router-dom";
import Graph from "./Graph";
import {
  TitleSPR,
  StudentInfo,
  AttendanceInfo,
  Table,
  Comment,
  Signature,
} from "./PrintComponents/StudentInfo";
import PlotCards from "./PrintComponents/PlotCards";
import { StudentProgressReportEntry } from "@/type/StudentProgressReportEntry";
import labelText from "../assets/other/labelText.json";

import "../styles/print.css"

// ---------------------------------
// Type Defintions
// ---------------------------------
type Language = keyof typeof labelText;

type TransformedLevel = {
  category: string;
  initial: number;
  target: number;
  final: number;
}

type PrintContentProps = {
  data: StudentProgressReportEntry;
}
  // Working on Transforming data
export const processData = (data: StudentProgressReportEntry["levels"]): TransformedLevel[] =>{
    return Object.entries(data).map(([category, level]) =>({
      category,
      initial: level.initial === "10+" ? 10 : parseFloat(level.initial),
      target: level.target === "10+" ? 10 : parseFloat(level.target),
      final: level.final === "10+" ? 10 : parseFloat(level.final)
    }));
  };

export const PrintContent: React.FC<PrintContentProps> = ({ data }) => {
  const language = data.language
  const { 
    name,
    textbook, course, attendance, totalLessons, feedback, levels } = data;

  const transformedData = processData(levels); 

  return (
    <>
      <div className="title-container">
        <div className="container">
          <img width={120} height={60} src={"/logo.jpg"} alt = {"Company Logo"} />
          <TitleSPR language={language} />
        </div>
      </div>
      <div className="student-information">
        <StudentInfo name={name} textbook={textbook} course={course} language={language} />
        <AttendanceInfo attendance={attendance} totalLessons={totalLessons} language={language} />
      </div>
      <Table levels={levels} language={language} />
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
