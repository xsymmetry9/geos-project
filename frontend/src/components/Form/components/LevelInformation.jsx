import  {useState} from 'react';
import LevelTabs from "./LevelTabs";
const LevelInformation = ({data, handleData, language}) =>{

    const [page, setPage] = useState(0)
    const titles = {
        english: ["vocabulary", "grammar", "pronunciation", "listening", "conversation"],
        chinese: [],
        korean: [],
        japanese: []
    }

    const levelValue = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];

    const handlerPage = () =>{
        setPage(prev => prev + 1);
    }

    const title = titles[language.toLowerCase()];
    console.log(title);
    return(
        <>
        <LevelTabs titles={titles[language.toLowerCase()]} />
        
        {titles[language.toLowerCase()].map((item, index) =>{
            return(
                <div key={index}><h3 className="capitalized">{item}</h3>
                    
                    <div className="levels-container">
                        <p className="capitalized">initial</p>
                        <div className="option-container">
                            <select className="spacing-sm form-input-primary" id={`${title[index]}-initial`} name={`${title[index]}-initial`} value={1} onChange={handleData}>
                                <option value="">Select score</option>
                                {levelValue.map((item_Value)=> <option value={item_Value}>{item_Value}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="levels-container">
                        <p className="capitalized">target</p>
                        <div className="option-container">
                            <select className="spacing-sm form-input-primary" id={`${title[index]}-initial`} name={`${title[index]}-initial`} value={1} onChange={handleData}>
                                <option value="">Select score</option>
                                {levelValue.map((item_Value)=> <option value={item_Value}>{item_Value}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="levels-container">
                        <p className="capitalized">final</p>
                        <div className="option-container">
                            <select className="spacing-sm form-input-primary" id={`${title[index]}-initial`} name={`${title[index]}-initial`} value={1} onChange={handleData}>
                                <option value="">Select score</option>
                                {levelValue.map((item_Value)=> <option value={item_Value}>{item_Value}</option>)}
                            </select>
                        </div>
                    </div>

                </div>
            )
        })}
        </>
    );
}

export default LevelInformation;