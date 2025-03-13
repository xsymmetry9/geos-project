import React, { useState, useId } from "react";
import PropTypes from "prop-types";
import { SquareX, Info } from "lucide-react";
import { getAllLevelsInformationByAspect, getLevelInformationByLevel } from "../../../utils/functions";

function LanguageAspect({key, inputData, aspectName, handleLevelInput, language }) {
  const [displayHelp, setDisplayHelp] = useState({initial: false, target: false, final: false})
  const [displayInitialHelp, setDisplayInitial] = useState(false);
  const [displayTargetHelp, setDisplayTargetHelp] = useState(false);
  const [displayFinalHelp, setDisplayFinalHelp] = useState(false);

  const displayHandlerOpen = (e) =>{
    const name = e.currentTarget.id.split('-')[0];
    setDisplayHelp((prev) =>({
      ...prev,
      [name]: true
    }));
  }

  const displayHandlerClose = (e) =>{
    const name = e.currentTarget.id.split('-')[0];
    setDisplayHelp((prev) => ({
      ...prev,
      [name]: false
    }))
  }

  const handlerCloseHelp = (e) => {
    const { id } = e.currentTarget;
    if (id === "initial-close") {
      setDisplayInitial(false);
    } else if (id === "target-close") {
      setDisplayTargetHelp(false);
    } else {
      setDisplayFinalHelp(false);
    }
  };

  const initialID = useId();
  const targetID = useId();
  const finalID = useId();

  const titleLanguage = {
    english: ["initial", "target", "final"],
    chinese: ["初始", "目標", "結束"],
    korean: ["초기", "목표", "결과"],
    japanese: ["初期", "目標", "終了"],
  };

  const PlotSelectOptionLevel = ({numIndex, itemName, aspectName}) => {
    return (      
      <>
        <div className= "w-full flex justify-between">
          {/* Title */}
          <span className="text-gray-700 capitalize">{titleLanguage[language][numIndex]}</span>
          { !displayHelp[itemName] && <button
              className="cursor-pointer"
              id={`${itemName}-open`}
              onClick={displayHandlerOpen}>
                <Info width={20} className="text-green-600 hover:text-green-300"/>
              </button>}
        </div>
        {/* Language Aspect Input */}
        <label htmlFor={`${aspectName}-${itemName}`}>
          <select className="font-primary text-base text-black block w-full mt-1 px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0  focus:border-[#09c5eb] hover:border-[#09c5eb]" 
          name= {`${aspectName}-${titleLanguage.english[numIndex]}`}
          id={`${aspectName}-${titleLanguage.english[numIndex]}`}
          value={inputData.levels[aspectName][titleLanguage.english[numIndex]]}
          onChange={handleLevelInput}>
            {/* Contains Several options depending on the JSON file */}
            {/* An empty string is set to default */}

            <option className ="font-secondary text-base text-md" value= {""}> Select Score</option>

            {/* Reads and maps all level from JSON file */}
            {getAllLevelsInformationByAspect({name: aspectName, lang: language}).map((item_Value, index) => (
              <>
              <option
                key={`${aspectName}-${itemName}-${index}`}
                className="font-secondary text-base"
                value={item_Value.level}
              >
                {item_Value.level}
              </option>
            </>
          ))}
          </select>
        </label>

        {/* Displays a help box  */}
        <div key={`${aspectName}-${itemName}-display`} className= "m-t-1"/>

        {/* Shows the helpbox is not active.  In order to activate it, click the activate button */}
        {displayHelp[itemName] && 
          <div className="grid grid-cols-[1fr_auto]">
              <p className="text-secondary text-slate-600">
                {
                  `${getLevelInformationByLevel({level: inputData.levels[aspectName][itemName], cat: aspectName, lang: language}).description}`
                }
              </p>
              {/* Add a close button */}
              <button
                className="cursor-pointer"
                id={`${itemName}-close`}
                onClick={displayHandlerClose}
              >
                <SquareX width={20} className="text-red-600 hover:text-red-300"/>
              </button>
            </div>}
      </>
    )
    
  }
  return (
    <>
      <div key={key} className="p-t-3">
        <h2 className="text-lg font-bold capitalize border-0 border-b-2 my-3">{aspectName}</h2>
        <div className="grid grid-cols-1 gap-3">
        {["initial", "target", "final"].map((item, index) => (
    <PlotSelectOptionLevel numIndex={index} itemName={item} aspectName={aspectName} key={item} />
        ))}

      </div>
    </div>
  </>
  );
}

LanguageAspect.propTypes = {
  inputData: PropTypes.object,
  aspectName: PropTypes.string,
  handleLevelInput: PropTypes.func,
  language: PropTypes.string,
};
export default LanguageAspect;
