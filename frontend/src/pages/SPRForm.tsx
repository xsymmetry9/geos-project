import React, { useState, createContext } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PlotForm from "../components/Form/PlotForm";
import { Student } from "../type/Student";
import { getStudentById } from "../utils/functions";
import { House } from "lucide-react";

export const LanguageContext = createContext<string>("english");

const SPRForm = () => {
  const { language ="english", id } = useParams<{language?: string; id?: string}>();

  const isNew = !id ? "new" : "edit";
  const initialStudent = !id? new Student(uuidv4()) : getStudentById(id);
  const [inputData, setInputData] = useState<Student>(initialStudent); //Creates an new or edit form
  return (
    <LanguageContext.Provider value={language}>
      <div className="w-full flex justify-center p-2">
        <Link className="font-secondary btn-primary flex gap-1 justify-center" to={`/home/${language}`}>
        <House />
          Home
        </Link>
      </div>
      <PlotForm inputData={inputData} setInputData={setInputData} />
    </LanguageContext.Provider>
  );
};

export default SPRForm;
