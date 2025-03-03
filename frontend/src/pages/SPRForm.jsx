import React, {useState, createContext} from "react";
import Form from "../components/Form/Form"
import { Link, useParams } from "react-router-dom";
import { Student } from "../type/Student";
import {v4 as uuidv4} from "uuid";
import { getStudentById } from "../utils/functions";

export const LanguageContext = createContext();

const SPRForm = () =>{
    const {language, id} = useParams();
    const [inputData, setInputData] = useState(!id ? new Student(uuidv4()): getStudentById(id)); //Creates an new or edit form
    const isNew = !id ? "new" : "edit"
    return(
   
        <LanguageContext.Provider value ={language}>
            <div className="p-1">
                <Link className="btn-primary" to={`/home/${language}`}>
                Dashboard</Link>
            </div>
            <Form inputData = {inputData} setInputData={setInputData} isNew ={isNew} />
        </LanguageContext.Provider>

    )
}

export default SPRForm;