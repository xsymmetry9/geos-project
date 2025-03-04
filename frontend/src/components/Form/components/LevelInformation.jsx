import React from "react";
import LanguageAspect from "./LanguageAspect";

const LevelInformation = ({inputData, handleLevelInputData, language}) =>{

  const titles = {
    english: ["vocabulary", "grammar", "pronunciation", "listening", "conversation"],
    chinese: ["詞彙", "文法", "發音", "聽力", "會話"],
    korean: ["어휘", "문법", "발음", "듣기", "대화"],
    japanese: ["語彙", "文法", "発音", "聴解", "会話"]
  };

  return(
    <>
      {/* <LevelTabs titles={titles[language.toLowerCase()]} handlerPage = {handlerPage} currentPage = {page}/> */}
      <div className="form-primary">
        <h2 className="title text-2 p-2">Student's Level</h2>
        {titles.english.map((aspectName) => {
          return(
            <div key= {aspectName}>
              <LanguageAspect aspectName={aspectName} inputData={inputData} handleLevelInput={handleLevelInputData} language={language}/>
            </div>
          );
        })
        }
      </div>
      
    </>
  );
};

export default LevelInformation;