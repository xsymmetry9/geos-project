import {useState} from "react";

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
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={name} placeholder="Name" onChange={handler} />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Form;