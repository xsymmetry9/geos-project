import React from "react";
import PropTypes from "prop-types";
import { getLevelInformationByLevel } from "../utils/functions";

const RenderLevelInformation = ({ category, studentLevel, language }) => {
  const studentInfo = getLevelInformationByLevel({
    level: studentLevel,
    cat: category,
    lang: language
  })
  return (
    <>
      <p>{studentInfo}</p>
    </>
  );
};

RenderLevelInformation.propTypes = {
  category: PropTypes.string,
  studentLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  language: PropTypes.string,
};

export default RenderLevelInformation;
