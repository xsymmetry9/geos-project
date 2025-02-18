import { useState, useId } from "react";
import LevelTabs from "./LevelTabs";

function LanguageAspect({inputData, aspectName, setInputData, language}) {

    const initialID = useId();
    const targetID = useId();
    const finalID = useId();
    
    const [initial, setInitial] = useState(0);
    const [final, setFinal] = useState(0);
    const [target, setTarget] = useState(0);

    const levelValue = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];

    const titleLanguage = {
        english: ["Initial", "Target", "Final"],
        chinese: ["初始", "目標", "結束"],
        korean: ["초기", "목표", "결과"],
        japanese: ["初期", "目標", "終了"]
    }

    console.log(inputData.levels[aspectName])
    return(
        <>
            <div className="input-wrapper p-t-3">
                <h2>{aspectName}</h2>
                <label className="text-2 uppercase">{titleLanguage[language.toLowerCase()][0]}</label>
                <select 
                    className="spacing-sm text-2"
                    id={`${aspectName}-initial`}
                    name={`${aspectName}-initial`}
                    value ={initial}
                    onChange={(e) => setInitial(e.target.value)}>
                    <option className="text-2" value={inputData}>Select score</option>
                    {levelValue.map((item_Value, index)=> <option className="text-2" key={`${initialID}-${item_Value}-${index}`} value={item_Value}>{item_Value}</option>)}
                </select>
                </div>
                <div className="input-wrapper">
                    <label className="text-2 uppercase">{titleLanguage[language.toLowerCase()][1]}</label>
                    <select 
                    className="spacing-sm text-2"
                    id={`${aspectName}-target`}
                    name={`${aspectName}-target`}
                    value ={target}
                    onChange={(e) => setTarget(e.target.value)}>
                    <option className="text-2" value={inputData}>Select score</option>
                    {levelValue.map((item_Value, index)=> <option className="text-2" key={`${targetID}-${item_Value}-${index}`} value={item_Value}>{item_Value}</option>)}
                </select>
                </div>
                <div className="input-wrapper">
                    <label className="text-2 uppercase">{titleLanguage[language.toLowerCase()][2]}</label>

                    <select 
                    className="spacing-sm text-2"
                    id={`${aspectName}-final`}
                    name={`${aspectName}-final`}
                    value ={final}
                    onChange={(e) => setFinal(e.target.value)}>
                    <option className="text-2" value={inputData}>Select score</option>
                    {levelValue.map((item_Value, index)=> <option className="text-2" key={`${finalID}-${item_Value}-${index}`} value={item_Value}>{item_Value}</option>)}
                </select>
                </div>
        </>
    )
}

export default LanguageAspect;