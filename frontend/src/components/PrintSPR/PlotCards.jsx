import React from 'react';
import RenderLevel from "../RenderLevel";
import labelText from "../../assets/other/labelText.json";

const text = (phrase, language) => labelText[language]['SPR'][phrase];

const PlotCards = ({levels, language}) =>{

    const arr = ["vocabulary", "grammar", "pronunciation", "listening", "conversation"];

    const Card = ({item, index, language}) => {
        const finalLevel = levels[index].final;
        
        return (<div className= "level-card">
                    <div className="level-card-title">
                        <strong><p className="level-card-title uppercase">{text(item, language)}</p></strong>
                    </div>
                    <div className="level-card-description">
                        <RenderLevel category={item} studentLevel={finalLevel} language={language}/>
                    </div>
                </div>)
    }
    return(
        <>
            <div className='cards-container'>
                {arr.map((item, index) => <Card item = {item} index = {index} key = {index} language={language}/>)}
            </div>
        </>
    )
}
export default PlotCards;