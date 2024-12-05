import {useState} from "react";
import "../../styles/components/form.scss";
import PersonalInformation from "./components/PersonalInformation";
import Pagination from "./components/Pagination";

const DEFAULT_name = "Gary";

const Form = ({language}) => {
    const {name, setName} = useState(DEFAULT_name);

    const handler = (e) =>{
        setName(e.currentTarget.value);
    }
    const title = {
        "English": "Student Progress Report",
        "Chinese": "学生进度报告",
        "Korean": "학생 진행 보고서 ",
        "Japanese": "学生進捗報告"
    }
    
    return(
        <div className="form-root">
            <form action="/post" method="POST">
                <div className="form-root">
                    <Pagination language={language} />
                    <PersonalInformation language={language} />
                </div>
            </form>
        </div>
    )
}

export default Form;