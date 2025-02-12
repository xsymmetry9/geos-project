import  {useState} from 'react';
import LevelTabs from "./LevelTabs";
const LevelInformation = ({data, handleLevelData, language}) =>{

    const [page, setPage] = useState(0);
    const titles = {
        english: ["vocabulary", "grammar", "pronunciation", "listening", "conversation"],
        chinese: ["詞彙", "文法", "發音", "聽力", "會話"],
        korean: ["어휘", "문법", "발음", "듣기", "대화"],
        japanese: ["語彙", "文法", "発音", "聴解", "会話"]
    }

    const levelValue = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];
    const titleLanguage = {
        english: ["Initial", "Target", "Final"],
        chinese: ["初始", "目標", "結束"],
        korean: ["초기", "목표", "결과"],
        japanese: ["初期", "目標", "終了"]
    }

    const handlerPage = (e) =>{
        const {name} = e.currentTarget;
        setPage(name);
    }
    return(
        <>
            <LevelTabs titles={titles[language.toLowerCase()]} handlerPage = {handlerPage} currentPage = {page}/>
                <div className="form-levels-container">
                    <div className="level-container">
                        <p className="capitalized">{titleLanguage[language.toLowerCase()][0]}</p>
                        <div className="option-container">
                            <select className="spacing-sm form-input-primary" id={`${titles['english'][page]}-initial`} name={`${titles['english'][page]}-initial`} value={data.levels[page].initial} onChange={handleLevelData}>
                                <option value="">Select score</option>
                                {levelValue.map((item_Value, index)=> <option key={`${item_Value}-${index}`} value={item_Value}>{item_Value}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="level-container">
                    <p className="capitalized">{titleLanguage[language.toLowerCase()][1]}</p>
                    <div className="option-container">
                        <select className="spacing-sm form-input-primary" id={`${titles['english'][page]}-target`} name={`${titles['english'][page]}-target`} value={data.levels[page].target} onChange={handleLevelData}>
                            <option value="">Select score</option>
                            {levelValue.map((item_Value, index)=> <option key={`${item_Value}-${index}`} value={item_Value}>{item_Value}</option>)}
                        </select>
                    </div>
                    </div>
                    <div className="level-container">
                    <p className="capitalized">{titleLanguage[language.toLowerCase()][2]}</p>
                    <div className="option-container">
                        <select className="spacing-sm form-input-primary" id={`${titles['english'][page]}-final`} name={`${titles['english'][page]}-final`} value={data.levels[page].final} onChange={handleLevelData}>
                            <option value="">Select score</option>
                            {levelValue.map((item_Value, index)=> <option key={`${item_Value}-${index}`} value={item_Value}>{item_Value}</option>)}
                        </select>
                    </div>
                    </div>

                </div>
      
        </>
    );
}

export default LevelInformation;