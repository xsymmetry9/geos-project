import {useState} from "react";
import form_languages from "../form_languages.js";

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
        <>
            <div id="personal-information">
                <label htmlFor="name">
                    <div className="input-wrapper">
                        <p>{input_name}</p>
                        <input type="text" name="name" value={name} onChange={handleData} />
                    </div>
                </label>
                <label htmlFor="course">
                    <div className="input-wrapper">
                        <p className="text-2 uppercase">{input_course}</p>
                        <select className="text-2 form-input-primary" id="course" name="course" value={course} onChange={handleData}>
                            <option className="text-2" value="">Select course</option>
                            <option className="text-2" value="ONLINE">ONLINE</option>
                            <option className="text-2" value="PL">PL</option>
                            <option className="text-2" value="GL">GL</option>
                            <option className="text-2" value="SGL">SGL</option>
                            <option className="text-2" value="FLEX">FLEX</option>
                        </select>
                    </div>
                    
                </label>
                <label htmlFor= "textbook">
                    <div className="input-wrapper">
                        <p className="text-2 uppercase">{input_textbook}</p>
                        <input className="text-2 form-input-primary" type="text" name="textbook" value={textbook} onChange={handleData} />
                    </div>
                </label>
                <label htmlFor= "attendance">
                    <div className="input-wrapper">
                        <p className="text-2 uppercase">{input_attendance}</p>
                        <input className="text-2 form-input-primary" type="number" name="attendance" id="attendance" value={attendance} onChange={handleData}/>
                    </div>
                </label>                             
                <label htmlFor="totalLessons">
                    <div className='input-wrapper'>
                        <p className="text-2 uppercase">{input_totallessons}</p>
                        <input className="text-2 form-input-primary" type="number" name="totalLessons" id="total-lesson" value={totalLessons} onChange={handleData}/>
                    </div>  
                </label>
            </div>
        </>
   
    )
}

export default PersonalInformation;