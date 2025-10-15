import PropTypes from "prop-types";
import { format } from "date-fns";
import labelText from "@/assets/other/labelText.json";
import {Student, Levels} from "@/type/Student";
import Legend from "@/components/PrintComponents/Legend";

type Language = keyof typeof labelText;
type LevelKey = keyof Levels;
type SPR = typeof labelText["english"]["SPR"];
type SPRStringKey =  {
  [K in keyof SPR]: SPR[K] extends string ? K : never
}[keyof SPR];

const text = (phrase: SPRStringKey, language: Language): string => labelText[language]["SPR"][phrase];

export const TitleSPR: React.FC<{ language: Language }> = ({ language }) => {
  const fontStyle = () => {
    if(language === "english") { 
    return "text-xl font-bold";
  } else if(language === "chinese") {
    return "text-xl font-bold print-chinese";
  } else {
    return "text-xl font-bold";
  }
  }

  return <h1 className={fontStyle()}>{text("title", language)}</h1>;  
};

interface StudentInfoProps {
  name: string;
  course: string;
  textbook: string;
  language: Language;
}
export const StudentInfo: React.FC<StudentInfoProps> = ({ name, course, textbook, language }) => {
  const fontStyle = () => {
    if(language === "english") {
      return "text-sm/5";
    } else if(language === "chinese") {
      return "text-sm";
    } else if(language === "japanese") {
      return "font-bold text-sm";
    } else {  
      return "text-sm/5";
    }     
  }
  return (
    <div id= "personal-info" className={`ml-[3rem] ${fontStyle()}`}>
      <p className="capitalize">
        {text("student_name", language)}: <strong>{name}</strong>
      </p>
      <p className={`capitalize ${fontStyle()}`}>{`${text("course", language)}: ${course}`}</p>
      <p className={`capitalize ${fontStyle()}`}>{`${text("textbook", language)}: ${textbook}`}</p>
    </div>
  );
};

interface AttendanceInfoProps {
  attendance: number;
  totalLessons: number;
  language: Language;
}

export const AttendanceInfo: React.FC<AttendanceInfoProps> = ({ attendance, totalLessons, language }) => {
    const fontStyle = () => {
      if(language === "english") {
        return "text-sm/5";
      } else if(language === "chinese") {
        return "text-sm/5";
      } else if(language === "japanese") {
        return "font-bold text-sm";
      } else {  
        return "text-sm/5";
      }
  }
  return (
  <div id="student-info" className="justify-self-end mr-[3rem]">
    <p className={`capitalize ${fontStyle()}`}>
      {language !== "chinese"
        ? `${text("date", language)}: ${format(new Date(), "MM/dd/yyyy")}`
        : `${text("date", language)}: ${format(new Date(), "yyyy年M月d日")}`}
    </p>
    <p className={`capitalize ${fontStyle()}`}>
      {text("attendance", language)}: {attendance != 0 ? `${attendance} ` : "NA"}
      <span className="lowercase">{attendance != 0 && text("times", language)}</span>
    </p>
    <p className={`capitalize ${fontStyle()}`}>
      {text("total_lessons", language)}: {totalLessons != 0 ? `${totalLessons} ${text("times", language)}` : "NA"}
    </p>
    <p className={`capitalize ${fontStyle()}`}>
      {text("%_of_attendance", language)}:{" "}
      {attendance !== "" && totalLessons !== "" ? `${Math.round((attendance / totalLessons) * 100)}%` : "NA"}
    </p>
  </div>
);
}

interface TableProps {
  levels: Student["levels"];
  language: Language;
}
const CEFRFramework = (str) => {

  if (str >= 0 && str < 2)
  {
    return "Pre - A1";
  } else if(str >= 2 && str < 3)
  {
    return "A1 - A2";
  } else if(str >= 3 && str < 4)
  {
    return "A2";
  } else if (str>=4 && str < 5)
  {
    return "A2 - B1";
  } else if(str>=5 && str < 6)
  {
    return "B1";
  } else if(str >= 6 && str < 7)
  {
    return "B1 - B2";
  } else if(str >= 7 && str < 8)
  {
    return "B2"
  } else if(str >= 8 && str < 9)
  {
    return "B2 - C1";
  } else if(str >= 9 && str <= 9.5)
  {
    return "C1";
  } else if(str >= 9.5 && str < 10){
    return  "C1+"
  } else {
    return;
  }

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
        const val = levels[key][label] === "" ? "0" : levels[key][label];
        console.log("sum:", val);
        return total + (val === "10+" ? 10.5 : parseFloat(val));

      },0);

    const avg = () => (sum() / labels.length).toFixed(2);

    return (
      <tr className="border-l border-r border-slate-600 last:border-b-1 odd:bg-[rgba(0,161,173,.2)] even:bg-white-50">
        <td className="text-center capitalize p-[2px]">
          {text(label, language)}
        </td>
        {labels.map((skill, idx) => (
          <td key={idx} className="text-center p-[2px]">
            {levels[skill][label]} <span className="color-slate-600 text-[10px]">
              {`${levels[skill][label] !== "" ? `(${CEFRFramework(levels[skill][label])})` : "-"}`}</span>
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
      <table className="table-fixed text-[12px] table-levels w-full mt-1 m-auto border-collapse">
        <Legend language={language} />
        <thead className="border-l border-r border-t border-slate-500">
          <tr>
            {headers.map((item, index) => (
              <th key={index} className="bg-[rgba(0,161,174,.7)] text-slate-800 h-[24px] capitalize">
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
  const fontStyleTitleComment = () => {
    if(language === "english") {
      return "capitalize font-bold text-sm";
    } else if(language === "chinese") {
      return "font-bold text-sm";
    } else if(language === "japanese") {
      return "font-semi-bold text-sm";
    } 
  }
  const fontStyleComment = () => {
    if(language === "english") {
      return "text-sm";
    } else if(language === "chinese") {
      return "text-sm";
    } else {
      return "text-sm";
    }
  } 
  return (
    <div id="feedback" className="border border-slate-700 h-[240px]">
      <div className="bg-[rgba(0,161,174,.7)] h-[24px]">
        <p className= {`ml-2 text-slate-800 ${fontStyleTitleComment()}`}>{text("comment", language)}</p>
      </div>
      <div className="px-2 py-1 h-[210px] overflow-hidden">
        <p className={`${fontStyleComment()}`}>{comment}</p>
      </div>
    </div>
  );
};

export const Signature: React.FC<{language: Language}> = ({ language }) => {
  return (
    <div className="mt-3 signature-section">
      <p className="capitalize text-xs/6">{text("signature", language)}</p>
      <div className="h-6 w-full border-b-1 border-slate-700" id="line"></div>
    </div>
  );
};
