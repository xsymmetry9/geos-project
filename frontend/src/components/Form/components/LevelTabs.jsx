const LevelTabs = ({titles, handlerPage}) =>{
    return(
        <div className="levelTab-container">
            {titles.map((item, index) =>{
                return(
                    <>
                        <div className="title-circle-container">
                            <div className="circle active">{index}</div>
                            <p key={index}>{item}</p>
                        </div>
                    </>
                )
            })}
        
        </div>
    )
}

export default LevelTabs;