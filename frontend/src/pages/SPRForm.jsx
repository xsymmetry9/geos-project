import React, { useState, createContext } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Form from "../components/Form/Form";
import { Student } from "../type/Student";
import { getStudentById } from "../utils/functions";
import { House } from "lucide-react";

export const LanguageContext = createContext();

<<<<<<< HEAD
const SPRForm = () =>{
    const {language, id} = useParams();
    const [inputData, setInputData] = useState(!id ? new Student(uuidv4()): getStudentById(id)); //Creates an new or edit form
 
    return(
   
        <LanguageContext.Provider value ={language}>
            <Link className="btn-primary" to={`/home/${language}`}>Dashboard</Link>
            <Form inputData = {inputData} setInputData={setInputData}/>
        </LanguageContext.Provider>
=======
const SPRForm = () => {
  const { language, id } = useParams();
  const [inputData, setInputData] = useState(!id ? new Student(uuidv4()) : getStudentById(id)); //Creates an new or edit form
  const isNew = !id ? "new" : "edit";
  return (
    <LanguageContext.Provider value={language}>
      <div className="w-full flex justify-center p-2">
        <Link className="font-secondary btn-primary flex gap-1 justify-center" to={`/home/${language}`}>
        <House />
          Home
        </Link>
      </div>
      <Form inputData={inputData} setInputData={setInputData} isNew={isNew} />
    </LanguageContext.Provider>
  );
};
>>>>>>> 801b1729e44fb8be552d401c981161bf4f1f1e37

export default SPRForm;
