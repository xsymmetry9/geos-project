import {useState} from "react";
import form_languages from "../form_languages.js";

const PersonalInformation = ({inputData, setInputData, language}) =>{
    const {name, course, textbook, attendance, totalLessons} = inputData;
    const [personalInformation, setPersonalInformation] = useState(
        {
            name: name,
            course: course,
            textbook: textbook,
            attendance: attendance,
            totalLessons: totalLessons
        }
    );

    const handler = (e) =>{
        const {name, value} = e.currentTarget;
        setPersonalInformation({...personalInformation,
            [name]: value
        })

    }
    const {
        input_name,
        input_course,
        input_textbook,
        input_attendance,
        input_totallessons} = form_languages[language.toLowerCase()];

    return(
        <div className="form-primary" id="personal-information">    
            <div className="input-wrapper">
                <label className="text-2 uppercase" htmlFor="name">{input_name}</label>
                <input type="text" className="text-2" name="name" value={personalInformation.name} onChange={handler} />
            </div>
            <div className="input-wrapper">
                <label className="text-2 uppercase" htmlFor="course">{input_course}</label>
                <select className="text-2 form-input-primary" id="course" name="course" value={personalInformation.course} onChange={handler}>
                    <option className="text-2" value="">Select course</option>
                    <option className="text-2" value="ONLINE">ONLINE</option>
                    <option className="text-2" value="PL">PL</option>
                    <option className="text-2" value="GL">GL</option>
                    <option className="text-2" value="SGL">SGL</option>
                    <option className="text-2" value="FLEX">FLEX</option>
                </select>
            </div>
            <div className="input-wrapper">
                <label className="text-2 uppercase" htmlFor="textbook">{input_textbook}</label>
                <input className="text-2" type="text" name="textbook" value={personalInformation.textbook} onChange={handler} />
                </div>
            <div className="input-wrapper">
                <label className="text-2 uppercase" htmlFor="attendance">{input_attendance}</label>
                <input className="text-2" type="number" name="attendance" id="attendance" value={personalInformation.attendance} onChange={handler}/>
            </div>
            <div className="input-wrapper">
                <label className="text-2 uppercase" htmlFor="totalLessons">{input_totallessons}</label>
                <input className="text-2" type="number" name="totalLessons" id="total-lesson" value={personalInformation.totalLessons} onChange={handler}/>
            </div>
        </div>
    )
}

export default PersonalInformation;