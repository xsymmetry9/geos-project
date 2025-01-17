import {useState} from "react";
import "../../styles/components/form.scss";
import PersonalInformation from "./components/PersonalInformation";
import Pagination from "./components/Pagination";
import Button from "./components/Button";
import LevelInformation from "./components/LevelInformation";
import Feedback from "./components/Feedback";
const Form = ({data, handleData, handleLevelData, language}) => {
    const [page, setPage] = useState(0);
    const [isLastPage, ] = useState(false)
    const arrOfPages = [
        <PersonalInformation data = {data} handleData={handleData} language={language}/>,
        <LevelInformation data={data} handleLevelData={handleLevelData} language={language}/>, 
        <Feedback data={data} handleData={handleData} language={language}/>];

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
           console.log("preview");
        }
        
    }

    return(
        <div className={`form-root`}>
            <Pagination page = {page} language={language}/>
            <form action="/post" method="POST">
                {arrOfPages[page]}
                <Button page={page} handler={changePage} language={language} />
            </form>
        </div>
    )
}

export default Form;