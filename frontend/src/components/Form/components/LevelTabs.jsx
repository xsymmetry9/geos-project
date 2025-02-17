import { useId } from "react";
import "../../../styles/components/levelTabs.scss";

const LevelTabs = ({currentPage, titles, handlerPage}) =>{
    const id = useId();
    
    return(
        <div className="levelTab-container">
            {titles.map((item, index) =>{
                return(
                    <>
                        <div key={`${id}-${item}-${index}`} className={`nameTab-container ${currentPage == index && "selected"}`}>
                            <input
                                key={`${id}-${index}-input`}
                                className={`tabTitle`} 
                                type="button" onClick={handlerPage} name={index} value={item}/>                    
                        </div>
                    </>
                )
            })}
        
        </div>
    )
}

export default LevelTabs;