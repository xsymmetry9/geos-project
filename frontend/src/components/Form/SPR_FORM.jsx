import {useState} from "react";
import PersonalInformation from "./components/PersonalInformation";
import Pagination from "./components/Pagination";
import Button from "./components/Button";
import LevelInformation from "./components/LevelInformation";
import Feedback from "./components/Feedback";
import Preview from "./components/Preview"
import "../../styles/components/form.scss";

const Form = ({data, handleData, handleLevelData, language}) => {
    const [page, setPage] = useState(0);
    const [isLastPage, ] = useState(false)
    const arrOfPages = [
        <PersonalInformation data = {data} handleData={handleData} language={language}/>,
        <LevelInformation data={data} handleLevelData={handleLevelData} language={language}/>, 
        <Feedback data={data} handleData={handleData} language={language}/>,
        <Preview data={data} language={language}/>];

    const changePage = (e) =>{
        const {name} = e.currentTarget;
        if(name ==="next"){
            if(page > arrOfPages.length - 1)
                {
                    setPage(0);
                } else {
                    setPage(prev => prev + 1);
                }
        } else if (name === "back"){
            setPage(prev => prev - 1);
        } else if(name ==="preview"){
            <h1>Hello</h1>
        }
        
    }
    return(
        <div className={`form-root`}>
            <Pagination page = {page} language={language}/>
            <div>
                {arrOfPages[page]}
                <Button page={page} handler={changePage} language={language} />
            </div>
        </div>
    )
}

export default Form;