// import "../styles/print.scss";

const Table = (levels) =>{
    console.log(levels);

    const levelInfo = [
        {level: "1", name: "Low beginner"}, 
        {level: "2-3", name: "Low Intermediate"}, 
        {level: "4-5", name: "Intermediate"}, 
        {level: "8-9", name: "Upper-Intermediate"},
        {level: "10", name: "Advanced"}
    ];

    const labels = ["", "vocabulary", "grammar", "pronunciation", "listening", "conversation", "total", "average"];

    const Row = ({levels, label}) =>{
        return(
            <tr>
                <td className='print-col title-table text-capitalized'>{label}</td>
                <td className='print-col' id={`${label}-${labels[1]}`}>1</td>
                <td className='print-col' id={`${label}-${labels[1]}`}>1</td>
                <td className='print-col' id={`${label}-${labels[1]}`}>1</td>
                <td className='print-col'id={`${label}-${labels[1]}`}>1</td>
                <td className='print-col'id={`${label}-${labels[1]}`}>1</td>
                <td className='print-col'id={`${label}-${labels[1]}`}>1</td>
                <td className='print-col'id={`${label}-${labels[1]}`}>1</td>
            </tr>
        )
    }


    return (
        <>
            <table className="table-levels">
                <caption>
                    <div className="caption-content"></div>
                        {levelInfo.map((item, index) => <div key={index} className='d-flex'><span>{item.level}.</span><span>{item.name}</span></div>)}
                </caption>
                <thead>
                    <tr>
                        {labels.map((item, index) => (<th key={index} className="table-col table-header">{item}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <Row levels= {levels} label= {"initial"} />
                    <Row levels={levels} label ={"target"} />
                    <Row levels={levels} label={"final"}/>
                </tbody>
            </table>
        </>
    )
}

export default Table;