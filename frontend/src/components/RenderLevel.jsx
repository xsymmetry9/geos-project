import React from "react";
import PropTypes from "prop-types";
import levelData from "../assets/other/levels.json";

const RenderLevelInformation = ({ category, studentLevel, language }) => {
  const levels = levelData[language][category];
  return (
    <>
      <p>{levels[studentLevel]}</p>
    </>
  );
};

RenderLevelInformation.propTypes = {
  category: PropTypes.string,
  studentLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  language: PropTypes.string,
};

export default RenderLevelInformation;
