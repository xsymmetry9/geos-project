import {useState} from "react";
import "../../styles/components/form.scss";
import PersonalInformation from "./components/PersonalInformation";
import Pagination from "./components/Pagination";

const DEFAULT_name = "Gary";

const Form = ({language}) => {
    const {name, setName} = useState(DEFAULT_name);
    const {pages, setPages} = useState({
        info: {on: true, complete: false},
        level: {on: false, complete: false},
        feedback: {on: false, complete: false}
    });

    const handler = (e) =>{
        setName(e.currentTarget.value);
    }
    return(
        <div className="form-root">
            <Pagination language={language} pages={pages} />

            <form action="/post" method="POST">
                    <PersonalInformation language={language} />
            </form>
        </div>
    )
}

export default Form;