import React from "react";
import PropTypes from "prop-types";
import { getLevelInformationByLevel } from "../utils/functions";

const RenderLevelInformation = ({ category, studentLevel, language }) => {
  return (
    <>
      <p>{getLevelInformationByLevel({level: studentLevel, cat: category, lang: language})}</p>
    </>
  );
};

RenderLevelInformation.propTypes = {
  category: PropTypes.string,
  studentLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  language: PropTypes.string,
};

export default RenderLevelInformation;
