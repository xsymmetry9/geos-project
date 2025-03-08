import React, { useState, useId } from "react";
// import LevelTabs from "./LevelTabs";
import PropTypes from "prop-types";
import text from "../../../assets/other/levels.json";
import { SquareX } from "lucide-react";
// import ToggleButton from "../../ToggleButton";

function LanguageAspect({key, inputData, aspectName, handleLevelInput, language }) {
  const [displayInitialHelp, setDisplayInitial] = useState(false);
  const [displayTargetHelp, setDisplayTargetHelp] = useState(false);
  const [displayFinalHelp, setDisplayFinalHelp] = useState(false);

  const handlerHelp = (e) => {
    const { id } = e.currentTarget;
    if (id === "initial-open") {
      setDisplayInitial(true);
    } else if (id === "target-open") {
      setDisplayTargetHelp(true);
    } else {
      setDisplayFinalHelp(true);
    }
  };

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

  const levelValue = [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7.0, 7.5, 8, 8.5, 9, 9.5, 10,
  ];

  const keyOfValues = Object.keys(text[language].conversation).map(Number).sort();

  const titleLanguage = {
    english: ["Initial", "Target", "Final"],
    chinese: ["初始", "目標", "結束"],
    korean: ["초기", "목표", "결과"],
    japanese: ["初期", "目標", "終了"],
  };
  return (
    <>
      <div key={key} className="p-t-3">
        <h2 className="text-lg font-bold capitalize border-0 border-b-2 my-3">{aspectName}</h2>
        <div className="grid grid-cols-1 gap-3">

          {/* ------------------------------------Intial Section --------------------------------- */}
          <label key={`${key}-initial`}className="block">
            <div className="w-full flex justify-between">
              <span className="text-gray-700 capitalize">{titleLanguage[language.toLowerCase()][0]}</span>
              {!displayInitialHelp && (<button
                className="cursor-pointer h-[24px] w-[24px] rounded border-0 text-white font-bold bg-green-600 hover:bg-white hover:text-green-600 hover:border-2 hover:border-green-600"
                id="initial-open"
                onClick={handlerHelp}>
                ?
              </button>
              )}
            </div>
            <select
              className="font-primary text-base text-black block w-full mt-1 px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0  focus:border-[#09c5eb] hover:border-[#09c5eb]"
              id={`${aspectName}-initial`}
              name={`${aspectName}-initial`}
              value={inputData.levels[aspectName].initial}
              onChange={handleLevelInput}
            >
            <option className="font-secondary text-base text-md" value={inputData}>Select score</option>
            
            {keyOfValues.map((item_Value, index) => (
              <>
              <option
                className="font-secondary text-base"
                key={`${initialID}-${item_Value}-${index}`}
                value={item_Value}
              >
                {item_Value}
              </option>
            </>
          ))}
            </select>
          </label>
          {/* Shows helpbox */}
          <div key={`${key}-initial-display`}className="m-t-1">
          {displayInitialHelp && (
            <div className="grid grid-cols-[1fr_auto]">
              <p className="text-secondary text-slate-600">
                {
                  text[language][aspectName][
                    inputData.levels[aspectName].initial
                  ]
                }
              </p>
              <button
                className="cursor-pointer h-[24px] w-[24px] rounded border-0 text-white font-bold bg-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600"
                id="initial-close"
                onClick={handlerCloseHelp}
              >
                x
              </button>
            </div>
          )}
          </div>

          {/* -------------------------------------Target Section--------------------------------- */}
          <label key={`${key}-target`} htmlFor={`${aspectName}-target`}>
            <div className="w-full flex justify-between">
              <span className="text-gray-700 capitalize">{titleLanguage[language.toLowerCase()][1]}</span>
              {!displayTargetHelp && (
                <div className="grid grid-cols-[1fr_auto]">
                  <button
                  className="cursor-pointer h-[24px] w-[24px] rounded border-0 text-white font-bold bg-green-600 hover:bg-white hover:text-green-600 hover:border-2 hover:border-green-600"
                  id="target-open"
                  onClick={handlerHelp}
                  >?
                  </button>
                </div>
              )}
            </div>
            <select
          className="font-primary text-base text-black block w-full mt-1 px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]"
          id={`${aspectName}-target`}
          name={`${aspectName}-target`}
          value={inputData.levels[aspectName].target}
          onChange={handleLevelInput}
        >
          <option className="font-secondary text-base text-md" value={inputData}>
            Select score
          </option>
          {keyOfValues.map((item_Value, index) => (
            <option
              className="font-secondary text-base text-md"
              key={`${targetID}-${item_Value}-${index}`}
              value={item_Value}
            >
              {item_Value}
            </option>
          ))}
        </select>
          </label>
          <div key={`${key}-final-target`} className="m-t-1">
          {displayTargetHelp && (
            <div className="grid grid-cols-[1fr_auto]">
              <p className="text-secondary text-slate-600">
                {
                  text[language][aspectName][
                    inputData.levels[aspectName].target
                  ]
                }
              </p>
              <button
                className="cursor-pointer h-[24px] w-[24px] rounded border-0 text-white font-bold bg-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600"
                id="target-close"
                onClick={handlerCloseHelp}
              >
                x
              </button>
            </div>
          )}
          </div>
          
          {/* -------------------------------------Final Section ---------------------------------- */}
          <label className="block">
            <div className="w-full flex justify-between">
              <span className="text-gray-700 capitalize">{titleLanguage[language.toLowerCase()][2]}</span>
              {!displayFinalHelp && ( <button 
                                        className="cursor-pointer h-[24px] w-[24px] rounded border-0 text-white font-bold bg-green-600 hover:bg-white hover:text-green-600 hover:border-2 hover:border-green-600" id="final-open"
                                        onClick={handlerHelp}
                                      >
                                      ?
                                        </button>)}
            </div>
            <select
              className="font-primary text-base text-black block w-full mt-1 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:outline-0 focus:border-[#09c5eb] hover:border-[#09c5eb]"
              id={`${aspectName}-final`}
              name={`${aspectName}-final`}
              value={inputData.levels[aspectName].final}
              onChange={handleLevelInput}
            >
            <option className="font-secondary text-base text-md" value={inputData}>
              Select score
            </option>
            {keyOfValues.map((item_Value, index) => (
              <option
                className="font-secondary text-base text-md"
                key={`${finalID}-${item_Value}-${index}`}
                value={item_Value}
              >
                {item_Value}
              </option>
              ))}
            </select>
          </label>
          <div className="m-t-1">
          {displayFinalHelp && (
            <div className="grid grid-cols-[1fr_auto] items-start">
              <p className="text-secondary text-slate-600">
                {text[language][aspectName][inputData.levels[aspectName].final]}
              </p>
              <button id="final-close" onClick={handlerCloseHelp}>
                <SquareX className="cursor-pointer text-red-600 hover:text-white hover:bg-red-600" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  </>
  );
}

LanguageAspect.propTypes = {
  inputData: PropTypes.obj,
  aspectName: PropTypes.string,
  handleLevelInput: PropTypes.func,
  language: PropTypes.string,
};
export default LanguageAspect;
