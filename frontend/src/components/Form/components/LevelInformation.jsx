import  {useState, useId} from 'react';
import LevelTabs from "./LevelTabs";
import LanguageAspect from './LanguageAspect';
const LevelInformation = ({inputData, setInputData, language}) =>{
    const {levels} = inputData;

    const [page, setPage] = useState(0);

    const levelInputHandler = (e) =>{
        const {name, value} = e.currentTarget;


        const parentCategory = name.split('-')[0];
        const childCategory = name.split('-')[1];

        console.log(parentCategory, childCategory);

        setInputData( {...inputData,
            levels: {...levels,
                [parentCategory]: {
                    ...levels[parentCategory],
                    [childCategory] : value
                }
            }})
    }

    const titles = {
        english: ["vocabulary", "grammar", "pronunciation", "listening", "conversation"],
        chinese: ["詞彙", "文法", "發音", "聽力", "會話"],
        korean: ["어휘", "문법", "발음", "듣기", "대화"],
        japanese: ["語彙", "文法", "発音", "聴解", "会話"]
    }

    const handlerPage = (e) =>{
        const {name} = e.currentTarget;
        setPage(name);
    }

    return(
        <>
            {/* <LevelTabs titles={titles[language.toLowerCase()]} handlerPage = {handlerPage} currentPage = {page}/> */}
            <div className="form-primary">
                <h2 className="title text-2 p-2">Student's Level</h2>
                <LanguageAspect aspectName ={titles.english[0]} inputData ={inputData} levelInputHandler = {levelInputHandler} language={language}/>
                <LanguageAspect aspectName ={titles.english[1]} inputData ={inputData} levelInputHandler = {levelInputHandler} language={language}/>
                <LanguageAspect aspectName ={titles.english[2]} inputData ={inputData} levelInputHandler = {levelInputHandler} language={language}/>
                <LanguageAspect aspectName ={titles.english[3]} inputData ={inputData} levelInputHandler = {levelInputHandler} language={language}/>
                <LanguageAspect aspectName ={titles.english[4]} inputData ={inputData} levelInputHandler = {levelInputHandler} language={language}/>

            </div>
      
        </>
    );
}

export default LevelInformation;