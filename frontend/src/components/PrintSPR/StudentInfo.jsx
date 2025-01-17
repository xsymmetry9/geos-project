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
        <div className="info-container">
            <div className="print-name"><p className="uppercase">{text("student_name", language)}: <strong>{name}</strong></p></div>
            <p className="uppercase">{`${text("course", language)}: ${course}`}</p>
            <p className="uppercase">{`${text("textbook", language)}: ${textbook}`}</p>
        </div>
    )
}
export const AttendanceInfo = ({attendance, totalLessons, language}) =>{
    return(
        <>
          <div className="info-container">
            <div className='two-columns-container'>
                <p className='personalInformation-title'>{text("date", language)}: </p>
                <p className='personalInformation-description justify-end'>{format(new Date(), "MM/dd/yyyy")}</p>
            </div>
            <div className='two-columns-container'>
                <p className='personalInformation-title'>{text("attendance", language)}: </p>
                <p className='personalInformation-description justify-end'>{attendance} {text("times", language)}</p>
            </div>
            <div className='two-columns-container'>
                <p className='personalInformation-title'>{text("total_lessons", language)}: </p>
                <p className='personalInformation-description justify-end'>{totalLessons} {text("times", language)}</p>
                </div>
                <div className='two-columns-container'>
                   <p className='personalInformation-title'>{text("%_of_attendance", language)}: </p>
                   <p className='personalInformation-description justify-end'>{parseFloat(attendance / totalLessons * 100).toFixed(2)}%</p>
                </div>
            </div>
        </>
    )
}
