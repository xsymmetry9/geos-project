import React, { useState, createContext } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Form from "../components/Form/Form";
import { Student } from "../type/Student";
import { getStudentById } from "../utils/functions";
import { House } from "lucide-react";

export const LanguageContext = createContext();

const SPRForm = () => {
  const { language, id } = useParams();
  const [inputData, setInputData] = useState(!id ? new Student(uuidv4()) : getStudentById(id)); //Creates an new or edit form
  const isNew = !id ? "new" : "edit";
  return (
    <LanguageContext.Provider value={language}>
      <div className="w-full flex justify-center p-2">
        <Link className="btn-primary flex gap-1 justify-center" to={`/home/${language}`}>
        <House />
          Home
        </Link>
      </div>
      <Form inputData={inputData} setInputData={setInputData} isNew={isNew} />
    </LanguageContext.Provider>
  );
};

export default SPRForm;
