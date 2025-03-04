import React, { useState, useId } from "react";
// import LevelTabs from "./LevelTabs";
import text from "../../../assets/other/levels.json";
// import ToggleButton from "../../ToggleButton";

function LanguageAspect({inputData, aspectName, handleLevelInput, language}) {

  const [displayHelp, setDisplayHelp] = useState({
    display_initial: false,
    display_target: false,
    display_final: false
  });
  const [displayInitialHelp, setDisplayInitial] = useState(false);
  const [displayTargetHelp, setDisplayTargetHelp] = useState(false);
  const [displayFinalHelp, setDisplayFinalHelp] = useState(false);

  const handlerHelp = (e) =>{
    const {id} = e.currentTarget;
    if(id === "initial-open"){
      setDisplayInitial(true);
    } else if(id === "target-open"){
      setDisplayTargetHelp(true);
    } else {
      setDisplayFinalHelp(true);
    }
  };

  const handlerCloseHelp = (e) =>{
    const {id} = e.currentTarget;
    if(id === "initial-close"){
      setDisplayInitial(false);
    } else if(id === "target-close"){
      setDisplayTargetHelp(false);
    } else {
      setDisplayFinalHelp(false);
    }
  };

  const initialID = useId();
  const targetID = useId();
  const finalID = useId();


  const levelValue = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];

  const titleLanguage = {
    english: ["Initial", "Target", "Final"],
    chinese: ["初始", "目標", "結束"],
    korean: ["초기", "목표", "결과"],
    japanese: ["初期", "目標", "終了"]
  };
  return(
    <>
      <div className="input-wrapper p-t-3">
        <h2>{aspectName}</h2>
        <div className="flex justify-space-between width-max">
          <label className="text-2 uppercase">{titleLanguage[language.toLowerCase()][0]}</label>
          {!displayInitialHelp && <div className="flex flex-end">
            <button className="btn-help" id="initial-open" onClick={handlerHelp}>?</button></div>}
        </div>
        <select 
          className="spacing-sm text-2"
          id={`${aspectName}-initial`}
          name={`${aspectName}-initial`}
          value ={inputData.levels[aspectName].initial}
          onChange={handleLevelInput}>
          <option className="text-2" value={inputData}>Select score</option>
          {levelValue.map((item_Value, index)=> 
            <>
              <option
                className="text-2" 
                key={`${initialID}-${item_Value}-${index}`} 
                value={item_Value}>
                {item_Value}
              </option>
            </>
          )}
        </select>
        <div className="m-t-1">
          {displayInitialHelp && <div className="level-text-box-container">
            <p>{text[language][aspectName][inputData.levels[aspectName].initial]}</p>
            <button className="btn-close" id="initial-close" onClick={handlerCloseHelp}>x</button>
          </div>}
        
        </div>


      </div>
      <div className="input-wrapper">
        <div className="flex justify-space-between w-max">
          <label className="text-2 uppercase">{titleLanguage[language.toLowerCase()][1]}</label>
          {/* <ToggleButton onToggle={setDisplayHelp}/> */}
          {!displayTargetHelp && <div className="flex flex-end">
            <button className="btn-help" id="target-open" onClick={handlerHelp}>?</button></div>}
        </div>
        <select 
          className="spacing-sm text-2"
          id={`${aspectName}-target`}
          name={`${aspectName}-target`}
          value ={inputData.levels[aspectName].target}
          onChange={handleLevelInput}>
          <option className="text-2" value={inputData}>Select score</option>
          {levelValue.map((item_Value, index)=> <option className="text-2" key={`${targetID}-${item_Value}-${index}`} value={item_Value}>{item_Value}</option>)}
        </select>
        <div className="m-t-1">
          {displayTargetHelp && <div className="level-text-box-container">
            <p>{text[language][aspectName][inputData.levels[aspectName].target]}</p>
            <button className="btn-close" id="target-close" onClick={handlerCloseHelp}>x</button>
          </div>}
        </div>
      </div>
      <div className="input-wrapper">
        <div className="flex justify-space-between w-max">
          <label className="text-2 uppercase">{titleLanguage[language.toLowerCase()][2]}</label>
          {!displayFinalHelp && <div className="flex flex-end">
            <button className="btn-help" id="final-open" onClick={handlerHelp}>?</button></div>}
        </div>
        <select 
          className="spacing-sm text-2"
          id={`${aspectName}-final`}
          name={`${aspectName}-final`}
          value ={inputData.levels[aspectName].final}
          onChange={handleLevelInput}>
          <option className="text-2" value={inputData}>Select score</option>
          {levelValue.map((item_Value, index)=> <option className="text-2" key={`${finalID}-${item_Value}-${index}`} value={item_Value}>{item_Value}</option>)}
        </select>
        <div className="m-t-1">
          {displayFinalHelp && <div className="level-text-box-container">
            <p>{text[language][aspectName][inputData.levels[aspectName].final]}</p>
            <button className="btn-close" id="final-close" onClick={handlerCloseHelp}>x</button>
          </div >}
                    
        </div>
      </div>
    </>
  );
}

export default LanguageAspect;