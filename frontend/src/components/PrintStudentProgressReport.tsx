import Graph from "@/components/Graph";
import {
  TitleSPR,
  StudentInfo,
  AttendanceInfo,
  Table,
  Comment,
  Signature,
} from "@/components/PrintComponents/StudentInfo";
import PlotCards from "@/components/PrintComponents/PlotCards";
import { Student } from "@/type/Student";
import labelText from "@/assets/other/labelText.json";
import "@/styles/print.css";

// ---------------------------------
// Type Defintions
// ---------------------------------
type Language = keyof typeof labelText;

type TransformedLevel = {
  category: string;
  initial: number;
  target: number;
  final: number;
};

type PrintContentProps = {
  parsedData: Student;
  language: Language;
  onGraphReady?: () => void;
};
// Working on Transforming data
export const processData = (data: Student["levels"]): TransformedLevel[] => {
  return Object.entries(data).map(([category, level]) => ({
    category,
    initial: level.initial === "10+" ? 10 : parseFloat(level.initial),
    target: level.target === "10+" ? 10 : parseFloat(level.target),
    final: level.final === "10+" ? 10 : parseFloat(level.final),
  }));
};

export const PrintContent: React.FC<PrintContentProps> = ({
  parsedData,
  language,
  onGraphReady,
}) => {
  const { name, textbook, course, attendance, totalLessons, feedback, levels } = parsedData;

  const transformedData = processData(levels);

  const fontLanguage = () => {
    switch (language) {
      case "english":
        return "font-primary";
      case "chinese":
        return "print-chinese";
      case "korean":
        return "kor print-korean";
      case "japanese":
        return "jp print-japanese";
      default:
        return "";
    }
  };

  // Main Return
  return (
    <div className={`${fontLanguage()}`}>
      <div className="title-container">
        <div className="container">
          <img width={120} height={60} src={"/logo.jpg"} alt={"Company Logo"} />
          <TitleSPR language={language} />
        </div>
      </div>
      <div className="student-information">
        <StudentInfo name={name} textbook={textbook} course={course} language={language} />
        <AttendanceInfo attendance={attendance} totalLessons={totalLessons} language={language} />
      </div>
      <Table levels={levels} language={language} />
      <div className="mt-[14px] grid grid-cols-2 gap-[12px]">
        <div className="gap- grid grid-cols-1">
          <Graph userData={transformedData} language={language} onReady={onGraphReady} />
          <Comment comment={feedback} language={language} />
          <Signature language={language} />
        </div>
        <PlotCards levels={levels} language={language} />
      </div>
    </div>
  );
};
