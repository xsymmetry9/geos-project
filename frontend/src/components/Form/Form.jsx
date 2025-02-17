import {useState} from "react";
import PersonalInformation from "./components/PersonalInformation";
import Pagination from "./components/Pagination";
import Button from "./components/Button";
import LevelInformation from "./components/LevelInformation";
import Feedback from "./components/Feedback";
import Preview from "./components/Preview"
import "../../styles/components/form.scss";

const Form = ({inputData, setInputData, language}) => {

    const handleInputData = (e) =>{
        const {name, value} = e.target;
        setInputData((prev) => ({ ...prev, [name]: value}));   
    }
    const [page, setPage] = useState(0);
    const arrOfPages = [
        <PersonalInformation inputData = {inputData} handleInputData = {handleInputData} language ={language}/>,
        <LevelInformation inputData={inputData} setInputData = {handleInputData} language={language}/>,
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

    const saveHandle = () => {
        console.log(inputData);

    }
    return(
        <div className={`form-root`}>
            <Pagination page = {page} language={language}/>
            <div>
                {/* {arrOfPages[page]} */}
                {/* <Button page={page} handler={changePage} language={language} /> */}
                <PersonalInformation inputData = {inputData} handleInputData = {handleInputData} language ={language}/>
                <LevelInformation inputData={inputData} setInputData = {handleInputData} language={language}/>
                <Feedback inputData = {inputData} handleInputData = {handleInputData} language = {language}  />
                <div className="flex justify-center">
                    <button className="btn-primary" onClick={saveHandle}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Form;