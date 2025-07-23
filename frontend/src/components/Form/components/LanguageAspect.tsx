import { useState } from "react";
import { SquareX, Info } from "lucide-react";
import { getAllLevelsInformationByAspect, getLevelInformationByLevel } from "../../../utils/functions";
import labelText from "../../../assets/other/labelText.json";
import {Levels, Student} from "../../../type/StudentProgressReportEntry";

type Language = keyof typeof labelText;
type LevelKey = keyof Levels;
type AspectName = keyof Student["levels"];

interface LanguageAspectProps {
  inputData: {
    levels: {
      [key in AspectName]: Levels;
    };
  };
  inputError: Record<string, boolean>;
  aspectName: AspectName;
  handleLevelInput: (e: React.ChangeEvent<HTMLSelectElement> ) => void;
  language: Language;
};


const LanguageAspect: React.FC<LanguageAspectProps> = ({inputData, aspectName, handleLevelInput, language }) => {
  const [displayHelp, setDisplayHelp] = useState<Record<LevelKey, boolean>>({
    initial: false, 
    target: false, 
    final: false
  });

  const displayHandlerOpen = (e: React.MouseEvent<HTMLButtonElement>) =>{
    const name = e.currentTarget.id.split('-')[0] as LevelKey;
    setDisplayHelp((prev) =>({
      ...prev,
      [name]: true
    }));
  }

  const displayHandlerClose = (e: React.MouseEvent<HTMLButtonElement>) =>{
    const name = e.currentTarget.id.split('-')[0] as LevelKey;
    setDisplayHelp((prev) => ({
      ...prev,
      [name]: false
    }))
  }
  const titleLanguage: Record<Language, Record<LevelKey, string>> = {
    english: {initial: "initial", target: "target", final: "final"},
    chinese: {initial: "初始", target: "目標", final: "結束"},
    korean: {initial: "초기",target: "목표",final: "결과"},
    japanese: {initial: "初期",target: "目標",final: "終了"},
  };

  const PlotSelectOptionLevel: React.FC<{
    numIndex: number;
    itemName: LevelKey;
    aspectName: AspectName;
    }> = ({numIndex, itemName, aspectName}) => {
    return (      
      <>
        <div className= "w-full flex justify-between">
          {/* Title */}
          <span className="text-gray-700 capitalize">{titleLanguage[language][itemName]}</span>
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
          name= {`${aspectName}-${itemName}`}
          id={`${aspectName}-${itemName}`}
          value={inputData.levels[aspectName][itemName]}
          onChange={handleLevelInput}>
            {/* Contains Several options depending on the JSON file */}
            {/* An empty string is set to default */}

            <option className ="font-secondary text-base text-md" value = "select_score">Select Score</option>

            {/* Reads and maps all level from JSON file */}
            {getAllLevelsInformationByAspect({name: aspectName, lang: language}).map((item_Value, index) => (
              
              <option
                key={`${aspectName}-${itemName}-${index}`}
                className="font-secondary text-base"
                value={item_Value.level}
              >
                {item_Value.level}
              </option>
      
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
                  `${getLevelInformationByLevel({level: inputData.levels[aspectName][itemName], cat: aspectName, lang: language})}`
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
      <div className="p-t-3">
        <h2 className="text-lg font-bold capitalize border-0 border-b-2 border-dark-green my-3">{labelText[language].SPR[aspectName]}</h2>
        <div className="grid grid-cols-1 gap-3">
        {(["initial", "target", "final"] as LevelKey[]).map((item, index) => (
          <div key={index}>
             <PlotSelectOptionLevel numIndex={index} itemName={item} aspectName={aspectName} key={item} />
          </div>
        ))}

      </div>
    </div>
  </>
  );
}

export default LanguageAspect;
