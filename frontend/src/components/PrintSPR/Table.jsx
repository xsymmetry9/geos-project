import React from "react";
import PropTypes from "prop-types";
import labelText from "../../assets/other/labelText.json";

const text = (phrase, language) => labelText[language]["SPR"][phrase];

const Table = ({ levels, language }) => {
  const levelInfo = [
    { level: "1", name: text("caption", language)["low_beginner"] },
    { level: "2-3", name: text("caption", language)["low_intermediate"] },
    { level: "4-5", name: text("caption", language)["intermediate"] },
    { level: "8-9", name: text("caption", language)["upper_intermediate"] },
    { level: "10", name: text("caption", language)["advanced"] },
  ];

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
    const sum = () => {
      return Object.keys(levels).reduce(
        (total, accumulator) => total + parseFloat(levels[accumulator][label]),
        0,
      );
    };

    const avg = () => {
      return parseFloat(sum() / 5, 2).toFixed(2);
    };
    return (
      <tr>
        <td className="print-col title-table text-capitalized">
          {text(label, language)}
        </td>
        <td className="print-col">{levels.vocabulary[label]}</td>
        <td className="print-col">{levels.grammar[label]}</td>
        <td className="print-col">{levels.pronunciation[label]}</td>
        <td className="print-col">{levels.listening[label]}</td>
        <td className="print-col">{levels.conversation[label]}</td>
        <td className="print-col">{sum()}</td>
        <td className="print-col">{avg()}</td>
      </tr>
    );
  };
  return (
    <>
      <table className="table-levels">
        <caption>
          <div className="caption-content">
            {levelInfo.map((item, index) => (
              <div key={index} className="d-flex">
                <span>{item.level}.</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </caption>
        <thead>
          <tr>
            {labels.map((item, index) => (
              <th key={index} className="table-col table-header">
                {text(item, language)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Row levels={levels} label={"initial"} />
          <Row levels={levels} label={"target"} />
          <Row levels={levels} label={"final"} />
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  levels: PropTypes.object,
  language: PropTypes.string,
  label: PropTypes.string,
};
export default Table;
