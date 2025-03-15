import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import labelText from "../../assets/other/labelText.json";

const text = (phrase, language) => labelText[language]["SPR"][phrase];

export const TitleSPR = ({ language }) => {
  return (
    <>
      <h1>{text("title", language)}</h1>
    </>
  );
};
export const StudentInfo = ({ name, course, textbook, language }) => {
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
export const AttendanceInfo = ({ attendance, totalLessons, language }) => {
  return (
    <div id="student-info" className="justify-self-end mr-[3rem]">
      <p className="capitalize">
        {text("date", language)}: {format(new Date(), "MM/dd/yyyy")}
      </p>
      <p className="capitalize">
        {text("attendance", language)}: {attendance} {text("times", language)}
      </p>
      <p className="capitalize">
        {text("total_lessons", language)}: {totalLessons}{" "}
        {text("times", language)}
      </p>
      <p className="capitalize">
        {text("%_of_attendance", language)}:{" "}
        {parseFloat((attendance / totalLessons) * 100).toFixed(2)}%
      </p>
    </div>
  );
};

export const Table = ({ levels, language }) => {
  // const levelInfo = [
  //   {level: "1", name: text("caption", language)["low_beginner"]},
  //   {level: "2-3", name: text("caption", language)["low_intermediate"]},
  //   {level: "4-5", name: text("caption", language)["intermediate"]},
  //   {level: "8-9", name: text("caption", language)["upper_intermediate"]},
  //   {level: "10", name: text("caption",language)["advanced"]}
  // ];

  const labels = [
    "",
    "vocabulary",
    "grammar",
    "pronunciation",
    "listening",
    "conversation",
    "total",
    "average",
  ];

  const Row = ({ levels, label }) => {
    const sum = () =>
      Object.keys(levels).reduce(
        (total, accumulator) => total + parseFloat((levels[accumulator][label]) === "10+" ? "10.5" : levels[accumulator][label]),
        0,
      );
    const avg = () => parseFloat(sum() / 5, 2).toFixed(2);

    return (
      <tr className="odd:bg-[rgba(0,161,173,.2)] even:bg-white-50">
        <td className="text-center capitalize p-[2px]">
          {text(label, language)}
        </td>
        <td className="text-center p-[2px]">{levels.vocabulary[label]}</td>
        <td className="text-center p-[2px]">{levels.grammar[label]}</td>
        <td className="text-center p-[2px]">{levels.pronunciation[label]}</td>
        <td className="text-center p-[2px]">{levels.listening[label]}</td>
        <td className="text-center p-[2px]">{levels.conversation[label]}</td>
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
      <table className="table-fixed font-secondary text-[12px] table-levels w-[700px] m-auto border-collapse border-1 border-slate-700">
        {/* <caption>
                    <div className="caption-content">
                        {levelInfo.map((item, index) => <div key={index} className='sub-header'><span>{item.level}.</span><span>{item.name}</span></div>)}
                    </div>
                </caption> */}
        <thead>
          <tr>
            {labels.map((item, index) => (
              <th key={index} className="bg-[rgb(0,161,173)] text-white font-normal py-[2px] capitalize">
                {text(item, language)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {["initial", "target", "final"].map((item) => <Row key={item} levels={levels} label={item}/>)}
        </tbody>
      </table>
    </>
  );
};

export const Comment = ({ comment, language }) => {
  const text = (phrase, language) => labelText[language]["SPR"][phrase];
  return (
    <div id="feedback" className="border border-slate-700 h-[240px]">
      <p className= "bg-[rgb(0,161,173)] pl-2 py-[2px] text-white font-bold capitalize">{text("comment", language)}</p>
      <div className="px-2 py-1">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export const Signature = ({ language }) => {
  return (
    <div className="mt-3 signature-section">
      <p className="capitalize">{text("signature", language)}</p>
      <div className="h-6 w-full border-b-1 border-slate-700" id="line"></div>
    </div>
  );
};

TitleSPR.propTypes = {
  language: PropTypes.string,
};

StudentInfo.propTypes = {
  name: PropTypes.string,
  course: PropTypes.string,
  textbook: PropTypes.string,
  language: PropTypes.string,
};

AttendanceInfo.propTypes = {
  attendance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalLessons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  language: PropTypes.string,
};

Table.propTypes = {
  levels: PropTypes.object,
  language: PropTypes.string,
};

Comment.propTypes = {
  comment: PropTypes.string,
  language: PropTypes.string,
};

Signature.propTypes = {
  language: PropTypes.string,
};
