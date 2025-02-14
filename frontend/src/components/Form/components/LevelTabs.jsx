const LevelTabs = ({currentPage, titles, handlerPage}) =>{
    return(
        <div className="levelTab-container">
            {titles.map((item, index) =>{
                return(
                    <>
                        <div key={`${item}-${index}`} className={`nameTab-container ${currentPage == index && "bgColorActive"}`}>
                            <input
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