import {useState} from "react";
import form_languages from "../form_languages.js";
import textbooks from "../../../assets/other/textbooks.json";
import Button from "../components/Button.jsx";

const PersonalInformation = ({language}) =>{
    const [personalInformation, setPersonalInformation] = useState(
        {
            name: "",
            course: "",
            textbook: "",
            attendance: "",
            totalLessons: ""
        }
    )

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
    console.log(title);

    return(
        <>
            <div className="personal-information-input">
                <label htmlFor="name">
                    <div className="input-wrapper">
                        <p className="input-title">{input_name}</p>
                        <input type="text" name="name" value={personalInformation.name} onChange={handler} />
                    </div>
                </label>
                <label htmlFor="course">
                    <div className="input-wrapper">
                        <p className="input-title">{input_course}</p>
                        <select className="spacing-sm" id="course" name="course" value={personalInformation.course} onChange={handler}>
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
                        <p className="input-title">{input_textbook}</p>
                        <select className="spacing-sm" name="textbook" id="textbook" value={personalInformation.textbook} onChange={handler}>
                            <option value="DEFAULT">Textbook name</option>
                            {textbooks.English.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                </label>
                <label htmlFor= "attendance">
                    <div className="input-wrapper">
                        <p className="input-title">{input_attendance}</p>
                        <input className="spacing-sm" type="number" name="attendance" id="attendance" value={personalInformation.attendance} onChange={handler}/>
                    </div>
                </label>                             
                <label htmlFor="totalLessons">
                    <div className='input-wrapper'>
                        <p className="input-title">{input_totallessons}</p>
                        <input className="spacing-sm" type="number" name="totalLessons" id="total-lesson" value={personalInformation.totalLessons} onChange={handler}/>
                    </div>  
                </label>
            </div>

            <Button />
        </>
   
    )
}

export default PersonalInformation;