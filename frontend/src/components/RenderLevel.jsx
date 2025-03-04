import React from "react";
import PropTypes from "prop-types";
import levelData from "../assets/other/levels.json";

const RenderLevelInformation = ({category, studentLevel, language}) =>{
  const levels = (levelData[language][category]);
    
  const getLevelInformation = () => studentLevel == 1 || studentLevel < 1.5 ? "1" : 
    studentLevel >= 1.5 && studentLevel < 2 ? "1.5" :
      studentLevel >= 2 && studentLevel < 2.5 ? "2" : 
        studentLevel >= 2.5 && studentLevel < 3 ? "2.5" :
          studentLevel >= 3 && studentLevel < 3.5 ? "3" :
            studentLevel >= 3.5 && studentLevel < 4 ? "3.5" :
              studentLevel >= 4 && studentLevel < 4.5 ? "4" :
                studentLevel >= 4.5 && studentLevel < 5 ? "4.5" :
                  studentLevel >= 5 && studentLevel < 5.5 ? "5" :
                    studentLevel >= 5.5 && studentLevel < 6 ? "5.5" :
                      studentLevel >= 6 && studentLevel < 6.5 ? "6" :
                        studentLevel >= 6.5 && studentLevel < 7 ? "6.5" :
                          studentLevel >= 7 && studentLevel < 7.5 ? "7" :
                            studentLevel >= 7.5 && studentLevel < 8 ? "7.5" :
                              studentLevel >= 8 && studentLevel < 8.5 ? "8" :
                                studentLevel >= 8.5 && studentLevel < 9 ? "8.5" :
                                  studentLevel >= 9 && studentLevel < 9.5 ? "9" :
                                    studentLevel >= 9.5 && studentLevel < 10 ? "9.5" :
                                      studentLevel == 10 ? "10" :
                                        studentLevel > 10 ? "10+" : "error";

  return(
    <>
      <p>{levels[getLevelInformation()]}</p>
    </>
  );

};

RenderLevelInformation.propTypes = {
  category: PropTypes.string,
  studentLevel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  language: PropTypes.string
};

export default RenderLevelInformation;

