import React from "react";
import PropTypes from "prop-types";
import LanguageAspect from "./LanguageAspect";
import labelText from "../../../assets/other/labelText.json"

const LevelInformation = ({
  inputData,
  inputError,
  handleLevelInputData,
  language,
}) => {
  const titles = {
    english: [
      "vocabulary",
      "grammar",
      "pronunciation",
      "listening",
      "conversation",
    ],
    chinese: ["詞彙", "文法", "發音", "聽力", "會話"],
    korean: ["어휘", "문법", "발음", "듣기", "대화"],
    japanese: ["語彙", "文法", "発音", "聴解", "会話"],
  };

  return (
    <>
      {/* <LevelTabs titles={titles[language.toLowerCase()]} handlerPage = {handlerPage} currentPage = {page}/> */}
      <div className="pb-[3rem]">
        <h2 className="bg-[#00646c] text-xl text-white p-2 font-bold capitalize text-center">{labelText[language].SPR["student_level"]}</h2>
        {titles.english.map((aspectName) => {
          return (
              <LanguageAspect
                key={aspectName}
                aspectName={aspectName}
                inputData={inputData}
                inputError = {inputError}
                handleLevelInput={handleLevelInputData}
                language={language}
              />
          );
        })}
      </div>
    </>
  );
};

LevelInformation.propTypes = {
  inputData: PropTypes.object,
  handleLevelInputData: PropTypes.func,
  language: PropTypes.string,
};

export default LevelInformation;
