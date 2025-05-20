import {useState} from "react";
import PropTypes from "prop-types";
import LanguageAspect from "./LanguageAspect";
import DisplayHelp from "./DisplayHelp";
import labelText from "../../../assets/other/labelText.json"

const LevelInformation = ({
  inputData,
  inputError,
  handleLevelInputData,
  language,
}) => {

  const [displayHelp, setDisplayHelp] = useState(false);

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
      <div className="pb-[3rem] relative">
        <h2 className="bg-[#00646c] text-xl text-white p-2 font-bold capitalize text-center">{labelText[language].SPR["student_level"]}</h2>
        <div className="w-full flex justify-center">
          <button className="btn border border-blue-500 bg-blue-500 bg-white-500 mt-3 text-white hover:text-black hover:bg-white"
          onClick={() => setDisplayHelp(true)}
          aria-label="display-help">Learn CEFR Levels</button>
        </div>
        {displayHelp && <DisplayHelp language = {language} setDisplayHelp = {setDisplayHelp} />}

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
