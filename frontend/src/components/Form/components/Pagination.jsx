const Pagination = ({page}) =>{
    const arr = ["Info", "Level", "Feedback", "Done"];
    return(
        <div className="root-pagination">
            <div className="pagination-container">
                {arr.map((item, index) => (
                    <div key= {index} className={`square ${(page === index) && "active"}`}>
                        <div className={`circle`}>{index}</div>
                        <p>{item}</p>
                    </div>))}
         
            </div>
        </div>
    )
}

export default Pagination