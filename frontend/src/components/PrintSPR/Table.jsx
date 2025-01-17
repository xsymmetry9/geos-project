import labelText from "../../assets/other/labelText.json";

const text = (phrase, language) => labelText[language]['SPR'][phrase];

const Table = ({levels, language}) =>{
    const levelInfo = [
        {level: "1", name: text("caption", language)["low_beginner"]}, 
        {level: "2-3", name: text("caption", language)["low_intermediate"]}, 
        {level: "4-5", name: text("caption", language)["intermediate"]}, 
        {level: "8-9", name: text("caption", language)["upper_intermediate"]},
        {level: "10", name: text("caption",language)["advanced"]}
    ];

    const labels = ["", "vocabulary", "grammar", "pronunciation", "listening", "conversation", "total", "average"];

    const Row = ({levels, label}) =>{
        const sum = () =>{
            return levels.reduce((total, accumulator) => total + parseFloat(accumulator[label]), 0);
        }
        const avg = () =>{
            return parseFloat(sum() / 5, 2).toFixed(2);
        }
        return(
            <tr>
                <td className='print-col title-table text-capitalized'>{text(label, language)}</td>
                <td className='print-col' id={`${label}-${labels[1]}`}>{levels[0][label]}</td> 
                <td className='print-col' id={`${label}-${labels[1]}`}>{levels[1][label]}</td>
                <td className='print-col' id={`${label}-${labels[1]}`}>{levels[2][label]}</td>
                <td className='print-col'id={`${label}-${labels[1]}`}>{levels[3][label]}</td>
                <td className='print-col'id={`${label}-${labels[1]}`}>{levels[4][label]}</td>
                <td className='print-col'id={`${label}-${labels[1]}`}>{sum()}</td>
                <td className='print-col'id={`${label}-${labels[1]}`}>{avg()}</td>
            </tr>
        )
    }
    return (
        <>
            <table className="table-levels">
                <caption>
                    <div className="caption-content">
                        {levelInfo.map((item, index) => <div key={index} className='d-flex'><span>{item.level}.</span><span>{item.name}</span></div>)}
                    </div>
                </caption>
                <thead>
                    <tr>
                        {labels.map((item, index) => (<th key={index} className="table-col table-header">{text(item, language)}</th>))}
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