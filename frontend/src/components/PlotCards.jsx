import React from 'react';
import RenderLevel from "../components/RenderLevel";

const PlotCards = (data) =>{
    const {levels} = data;

    const arr = ["vocabulary", "grammar", "pronunciation", "listening", "conversation"];

    const Card = ({item, index}) => {
        const finalLevel = levels[index].final;
        console.log("Category is: " + item);
        console.log("Final level is: " + finalLevel);
        
        return (<div className= "level-card">
                    <div className="level-card-title">
                        <strong><p className="level-card-title">{item.toUpperCase()}</p></strong>
                    </div>
                    <div className="level-card-description">
                        <RenderLevel category={item} studentLevel={finalLevel}/>
                    </div>
                </div>)
    }
    return(
        <>
            <div className='cards-container'>
                {arr.map((item, index) => <Card item = {item} index = {index} key = {index} />)}
            </div>
        </>
    )
}
export default PlotCards;