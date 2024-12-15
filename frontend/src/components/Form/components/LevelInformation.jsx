import  {useState} from 'react';
import LevelTabs from "./LevelTabs";
const LevelInformation = ({data, handleLevelData, language}) =>{

    const {levels} = data;
    const [page, setPage] = useState(0)
    const titles = {
        english: ["vocabulary", "grammar", "pronunciation", "listening", "conversation"],
        chinese: [],
        korean: [],
        japanese: []
    }

    const levelValue = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];

    const handlerPage = (e) =>{
        const {name} = e.currentTarget;
        console.log(name);
        setPage(name);
    }

    const title = titles[language.toLowerCase()];
    return(
        <>
            <LevelTabs titles={titles[language.toLowerCase()]} handlerPage = {handlerPage} currentPage = {page}/>

                <div className="form-levels-container">
                    <div className="level-container">
                    <p className="capitalized">initial</p>
                    <div className="option-container">
                        <select className="spacing-sm form-input-primary" id={`initial-${titles[language.toLowerCase()][page]}-initial`} name={`${titles[language.toLowerCase()][page]}-initial`} value={data.levels[page].initial} onChange={handleLevelData}>
                            <option value="">Select score</option>
                            {levelValue.map((item_Value)=> <option value={item_Value}>{item_Value}</option>)}
                        </select>
                    </div>
                    </div>
                    <div className="level-container">
                    <p className="capitalized">target</p>
                    <div className="option-container">
                        <select className="spacing-sm form-input-primary" id={`${title[page]}-target`} name={`${title[page]}-target`} value={data.levels[page].target} onChange={handleLevelData}>
                            <option value="">Select score</option>
                            {levelValue.map((item_Value)=> <option value={item_Value}>{item_Value}</option>)}
                        </select>
                    </div>
                    </div>
                    <div className="level-container">
                    <p className="capitalized">final</p>
                    <div className="option-container">
                        <select className="spacing-sm form-input-primary" id={`${title[page]}-final`} name={`${title[page]}-final`} value={data.levels[page].final} onChange={handleLevelData}>
                            <option value="">Select score</option>
                            {levelValue.map((item_Value)=> <option value={item_Value}>{item_Value}</option>)}
                        </select>
                    </div>
                    </div>

                </div>
                    
            

          
      

        
      
        </>
    );
}

export default LevelInformation;