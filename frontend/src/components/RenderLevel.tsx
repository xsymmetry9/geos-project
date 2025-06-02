<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";
import { getLevelInformationByLevel } from "../utils/functions";

const RenderLevelInformation = ({ category, studentLevel, language }) => {
=======
import { getLevelInformationByLevel } from "../utils/functions";
import labelText from "../assets/other/labelText.json"

type Language = keyof typeof labelText;

interface RenderLevelInformationProps {
  category: string;
  studentLevel: string | number;
  language: Language;
}
const RenderLevelInformation: React.FC<RenderLevelInformationProps> = ({ category, studentLevel, language }) => {
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
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

<<<<<<< HEAD
RenderLevelInformation.propTypes = {
  category: PropTypes.string,
  studentLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  language: PropTypes.string,
};

=======
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
export default RenderLevelInformation;
