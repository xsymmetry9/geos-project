import {useState} from "react";
import form_languages from "../form_languages.js";
import textbooks from "../../../assets/other/textbooks.json";

const PersonalInformation = ({data, handleData, language}) =>{
    const {name, course, textbook, attendance, totalLessons} = data;
    const [personalInformation, setPersonalInformation] = useState(
        {
            name: data.name,
            course: data.course,
            textbook: data.textbook,
            attendance: data.attendance,
            totalLessons: data.totalLessons
        }
    );
    const [complete, setComplete] = useState(false);

    const handler = (e) =>{
        const {name, value} = e.currentTarget;
        setPersonalInformation({...personalInformation,
            [name]: value
        })

    }
    const {title,
        input_name,
        input_course,
        input_textbook,
        input_attendance,
        input_totallessons} = form_languages[language.toLowerCase()];

    return(
        <>
            <div className="container" id="personal-information">
                <label htmlFor="name">
                    <div className="input-wrapper">
                        <p className="uppercase">{input_name}</p>
                        <input type="text" name="name" value={name} onChange={handleData} />
                    </div>
                </label>
                <label htmlFor="course">
                    <div className="input-wrapper">
                        <p className="uppercase">{input_course}</p>
                        <select className="spacing-sm" id="course" name="course" value={course} onChange={handleData}>
                            <option value="">Select course</option>
                            <option value="ONLINE">ONLINE</option>
                            <option value="PL">PL</option>
                            <option value="GL">GL</option>
                            <option value="SGL">SGL</option>
                            <option value="FLEX">FLEX</option>
                        </select>
                    </div>
                    
                </label>
                <label htmlFor= "textbook">
                    <div className="input-wrapper">
                        <p className="uppercase">{input_textbook}</p>
                        <select className="spacing-sm" name="textbook" id="textbook" value={textbook} onChange={handleData}>
                            <option value="DEFAULT">Textbook name</option>
                            {textbooks.English.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                </label>
                <label htmlFor= "attendance">
                    <div className="input-wrapper">
                        <p className="uppercase">{input_attendance}</p>
                        <input className="spacing-sm" type="number" name="attendance" id="attendance" value={attendance} onChange={handleData}/>
                    </div>
                </label>                             
                <label htmlFor="totalLessons">
                    <div className='input-wrapper'>
                        <p className="uppercase">{input_totallessons}</p>
                        <input className="spacing-sm" type="number" name="totalLessons" id="total-lesson" value={totalLessons} onChange={handleData}/>
                    </div>  
                </label>
            </div>
        </>
   
    )
}

export default PersonalInformation;