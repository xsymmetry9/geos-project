import {useContext, useState} from "react";
import PersonalInformation from "./components/PersonalInformation";
import Feedback from "./components/Feedback";
import LevelInformation from "./components/LevelInformation";
import Preview from "./components/Preview"
import Pagination from "./components/Pagination";
import Button from "./components/Button";
import "../../styles/components/form.scss";
import {Student} from "../../type/Student";
import { LanguageContext } from "../../pages/SPRForm";
import {v4 as uuidv4} from "uuid";
import PopUpMessage from "../PopUpMessage";

const Form = () => {
    const [inputData, setInputData] = useState(new Student(uuidv4()));
    const [displayPopupMessage, setDisplayPopupMessage] = useState(false);

    const language = useContext(LanguageContext);

    const handleInputData = (e) =>{
        const {name, value} = e.target;
        setInputData((prev) => ({ ...prev, [name]: value}));   
    }

    const handleLevelInputData = (e) =>{
        const {name, value} = e.currentTarget;

        const parentCategory = name.split('-')[0];
        const childCategory = name.split('-')[1];

        setInputData((prev) => ({ ...prev, 
            levels: {...prev.levels,
                [parentCategory]: {...prev.levels[parentCategory],
                    [childCategory]: value
                }
            }}
        ))
    }
    const [page, setPage] = useState(0);
    const arrOfPages = [
        <PersonalInformation inputData = {inputData} handleInputData = {handleInputData} language={language}/>,
        <LevelInformation inputData={inputData} setInputData = {setInputData} handleLevelInputData = {handleLevelInputData} language={language}/>,
        <Feedback inputData = {inputData} handleInputData = {handleInputData} language = {language}  />,
        <Preview inputData={inputData} language={language}/>];

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
            console.log("go to preview page");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputData);
        try{
            const savedData = JSON.parse(localStorage.getItem("GEOS_app"));
            savedData.SPR.push(inputData);

            localStorage.setItem("GEOS_app", JSON.stringify(savedData));
            
        } catch (err) {
            console.log("Unable to load", err);
        }

        setDisplayPopupMessage(true);

        


    }
    return(
        <div className={`form-root`}>
            <Pagination page = {page} language={language}/>
            <div>
                <form onSubmit={handleSubmit}>
                    {arrOfPages[page]}
                    <div className="container" id="buttons">
                        <Button page={page} handler={changePage} language={language} handleSubmit = {handleSubmit} />
                        {page == 3 && <input className="btn btn-primary" type="submit" value={"Save"}/>}                   
                    </div>      
                </form>
                {displayPopupMessage && <PopUpMessage setDisplayPopupMessage = {setDisplayPopupMessage}/>}
            </div>
        </div>
    )
}

export default Form;