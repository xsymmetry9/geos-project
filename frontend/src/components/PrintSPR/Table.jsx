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
        <td>
          {text(label, language)}
        </td>
        <td>{levels.vocabulary[label]}</td>
        <td>{levels.grammar[label]}</td>
        <td>{levels.pronunciation[label]}</td>
        <td>{levels.listening[label]}</td>
        <td>{levels.conversation[label]}</td>
        <td>{sum()}</td>
        <td>{avg()}</td>
      </tr>
    );
  };
  return (
    <>
      <table className="table-levels">
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
