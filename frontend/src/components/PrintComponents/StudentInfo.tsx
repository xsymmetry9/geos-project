import PropTypes from "prop-types";
import { format } from "date-fns";
import labelText from "../../assets/other/labelText.json";
import {Student, Levels} from "../../type/Student";

type Language = keyof typeof labelText;
type LevelKey = keyof Levels;
type SPR = typeof labelText["english"]["SPR"];
type SPRStringKey =  {
  [K in keyof SPR]: SPR[K] extends string ? K : never
}[keyof SPR];

const text = (phrase: SPRStringKey, language: Language): string => labelText[language]["SPR"][phrase];

export const TitleSPR: React.FC<{ language: Language }> = ({ language }) => {
  return <h1>{text("title", language)}</h1>;
};

interface StudentInfoProps {
  name: string;
  course: string;
  textbook: string;
  language: Language;
}
export const StudentInfo: React.FC<StudentInfoProps> = ({ name, course, textbook, language }) => {
  return (
    <div id= "personal-info" className="ml-[3rem]">
      <p className="capitalize">
        {text("student_name", language)}: <strong>{name}</strong>
      </p>
      <p className="capitalize">{`${text("course", language)}: ${course}`}</p>
      <p className="capitalize">{`${text("textbook", language)}: ${textbook}`}</p>
    </div>
  );
};

interface AttendanceInfoProps {
  attendance: number;
  totalLessons: number;
  language: Language;
}

export const AttendanceInfo: React.FC<AttendanceInfoProps> = ({
  attendance,
  totalLessons,
  language,
}) => (
  <div id="student-info" className="justify-self-end mr-[3rem]">
    <p className="capitalize">
      {language !== "chinese"
        ? `${text("date", language)}: ${format(new Date(), "MM/dd/yyyy")}`
        : `${text("date", language)}: ${format(new Date(), "yyyy年M月d日")}`}
    </p>
    <p className="capitalize">
      {text("attendance", language)}: {attendance}{" "}
      <span className="lowercase">{text("times", language)}</span>
    </p>
    <p className="capitalize">
      {text("total_lessons", language)}: {totalLessons}{" "}
      <span className="lowercase">{text("times", language)}</span>
    </p>
    <p className="capitalize">
      {text("%_of_attendance", language)}:{" "}
      {Math.round((attendance / totalLessons) * 100)}%
    </p>
  </div>
);

interface TableProps {
  levels: Student["levels"];
  language: Language;
}

export const Table: React.FC<TableProps> = ({ levels, language }) => {
  const headers: (SPRStringKey | "")[] = [
    "",
    "vocabulary",
    "grammar",
    "pronunciation",
    "listening",
    "conversation",
    "total",
    "average"
  ]
  const Row = ({ label} : {label: LevelKey}) => {
      const labels: (keyof typeof levels)[] = [
    "vocabulary",
    "grammar",
    "pronunciation",
    "listening",
    "conversation",
  ]
    const sum = () =>
      labels.reduce((total, key) => {
        const val = levels[key][label];
        return total + (val === "10+" ? 10.5 : parseFloat(val));

      },0);

    const avg = () => (sum() / labels.length).toFixed(2);

    return (
      <tr className="odd:bg-[rgba(0,161,173,.2)] even:bg-white-50">
        <td className="text-center capitalize p-[2px]">
          {text(label, language)}
        </td>
        {labels.map((skill, idx) => (
          <td key={idx} className="text-center p-[2px]">
            {levels[skill][label]}
          </td>
        ))}
        <td className="text-center p-[2px]">{sum()}</td>
        <td className="text-center p-[2px]">{avg()}</td>
      </tr>
    );
  };

  Row.propTypes = {
    levels: PropTypes.object,
    label: PropTypes.string,
  };
  return (
    <>
      <table className="table-fixed text-[12px] table-levels w-[700px] mt-2 m-auto border-collapse border-1 border-slate-700">
        {/* <caption>
                    <div className="caption-content">
                        {levelInfo.map((item, index) => <div key={index} className='sub-header'><span>{item.level}.</span><span>{item.name}</span></div>)}
                    </div>
                </caption> */}
        <thead>
          <tr>
            {headers.map((item, index) => (
              <th key={index} className="bg-[rgb(0,161,173)] text-white font-normal py-[2px] capitalize">
                {item === "" ? "" : text(item, language)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {["initial", "target", "final"].map((item) => <Row key={item as LevelKey} levels={levels} label={item as LevelKey}/>)}
        </tbody>
      </table>
    </>
  );
};

interface CommentProps {
  comment: string;
  language: Language;
}
export const Comment: React.FC<CommentProps> = ({ comment, language }) => {
  return (
    <div id="feedback" className="border border-slate-700 h-[240px]">
      <p className= "bg-[rgb(0,161,173)] pl-2 py-[2px] text-white font-bold capitalize">{text("comment", language)}</p>
      <div className="px-2 py-1">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export const Signature: React.FC<{language: Language}> = ({ language }) => {
  return (
    <div className="mt-3 signature-section">
      <p className="capitalize">{text("signature", language)}</p>
      <div className="h-6 w-full border-b-1 border-slate-700" id="line"></div>
    </div>
  );
};
