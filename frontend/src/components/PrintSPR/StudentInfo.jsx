import {format} from "date-fns";
import labelText from "../../assets/other/labelText.json";

const text = (phrase, language) => labelText[language]['SPR'][phrase];

export const TitleSPR = ({language}) =>{
    return (
        <>
            <h1>{text("title", language)}</h1>
        </>
    )
}
export const StudentInfo = ({name, course, textbook, language}) =>{
    return(
        <div className="info-container left">
            <p className="uppercase">{text("student_name", language)}: <strong>{name}</strong></p>
            <p className="uppercase">{`${text("course", language)}: ${course}`}</p>
            <p className="uppercase">{`${text("textbook", language)}: ${textbook}`}</p>
        </div>
    )
}
export const AttendanceInfo = ({attendance, totalLessons, language}) =>{
    return(
        <div className="info-container right">
            <p>{text("date", language)}: {format(new Date(), "MM/dd/yyyy")}</p>
            <p>{text("attendance", language)}: {attendance} {text("times", language)}</p>
            <p>{text("total_lessons", language)}: {totalLessons} {text("times", language)}</p>
            <p>{text("%_of_attendance", language)}: {parseFloat(attendance / totalLessons * 100).toFixed(2)}%</p>
        </div>
    )
}

export const Table = ({levels, language}) =>{
    const levelInfo = [
        {level: "1", name: text("caption", language)["low_beginner"]}, 
        {level: "2-3", name: text("caption", language)["low_intermediate"]}, 
        {level: "4-5", name: text("caption", language)["intermediate"]}, 
        {level: "8-9", name: text("caption", language)["upper_intermediate"]},
        {level: "10", name: text("caption",language)["advanced"]}
    ];

    const labels = ["", "vocabulary", "grammar", "pronunciation", "listening", "conversation", "total", "average"];

    const Row = ({levels, label}) =>{
        const sum = () => Object.keys(levels).reduce((total, accumulator) => total + parseFloat(levels[accumulator][label]), 0);
        const avg = () => parseFloat(sum() / 5, 2).toFixed(2);

        return(
            <tr>
                <td className='print-col title-table text-capitalized'>{text(label, language)}</td>
                <td className='print-col'>{levels.vocabulary[label]}</td> 
                <td className='print-col'>{levels.grammar[label]}</td>
                <td className='print-col'>{levels.pronunciation[label]}</td>
                <td className='print-col'>{levels.listening[label]}</td>
                <td className='print-col'>{levels.conversation[label]}</td>
                <td className='print-col'>{sum()}</td>
                <td className='print-col'>{avg()}</td>
            </tr>
        )
    }
    return (
        <>
            <table className="table-levels">
                {/* <caption>
                    <div className="caption-content">
                        {levelInfo.map((item, index) => <div key={index} className='sub-header'><span>{item.level}.</span><span>{item.name}</span></div>)}
                    </div>
                </caption> */}
                <thead>
                    <tr>
                        {labels.map((item, index) => (<th key={index} className="table-header">{text(item, language)}</th>))}
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

export const Comment = ({comment, language}) =>{
    const text = (phrase, language) => labelText[language]['SPR'][phrase];
    return(
        <div id="feedback" className="feedback-card">
            <div className="title">
                <strong><p className>{text("comment", language)}</p></strong>
            </div>
            <div className = "description">
                <p>{comment}</p>
            </div>
        </div>
    )
}

export const Signature = ({language}) =>{
    return(
        <div className="signature-section">
            <div className="card-title-no-border"><p className="uppercase">{text("signature", language)}</p></div>
            <div className="signature-line"id = "line"></div>
        </div>
    )
}

