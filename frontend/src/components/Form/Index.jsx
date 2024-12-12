import {useState} from "react";
import "../../styles/components/form.scss";
import PersonalInformation from "./components/PersonalInformation";
import Pagination from "./components/Pagination";
import Button from "./components/Button";
import LevelInformation from "./components/LevelInformation";
import Feedback from "./components/Feedback";

const DEFAULT_name = "Gary";

const Form = ({data, handleData, language}) => {
    const [page, setPage] = useState(0);
    const arrOfPages = [<PersonalInformation data = {data} handleData={handleData} language={language}/>, <LevelInformation/>, <Feedback/>];

    const changePage = () =>{
        if(page > arrOfPages.length - 1)
        {
            setPage(0);
        } else {
            setPage(prev => prev+ 1);
        }
    }

    const handler = (e) =>{
        setName(e.currentTarget.value);
    }
    return(
        <div className="form-root">
            <Pagination page = {page}/>
            <form action="/post" method="POST">
                {arrOfPages[page]}
                <Button page={page} handler={changePage} />
            </form>
        </div>
    )
}

export default Form;