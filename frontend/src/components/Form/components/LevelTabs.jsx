const LevelTabs = ({currentPage, titles, handlerPage}) =>{
    return(
        <div className="levelTab-container">
            {titles.map((item, index) =>{
                return(
                    <>
                        <div key={index} className={`nameTab-container ${(currentPage == index )? "bgColorActive" : "bgColorInactive"}`}>
                            <input
                                className={`tabTitle ${currentPage == index ? "bgColorActive" : "bgColorInactive"}`} 
                                type="button" onClick={handlerPage} name={index} value={item}/>                    
                        </div>
                    </>
                )
            })}
        
        </div>
    )
}

export default LevelTabs;