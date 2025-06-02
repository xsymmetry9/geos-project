<<<<<<< HEAD
import React, { useState, createContext } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Form from "../components/Form/Form";
=======
import { useState, createContext } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PlotForm from "../components/Form/PlotForm";
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
import { Student } from "../type/Student";
import { getStudentById } from "../utils/functions";
import { House } from "lucide-react";

<<<<<<< HEAD
export const LanguageContext = createContext();

const SPRForm = () => {
  const { language, id } = useParams();
  const [inputData, setInputData] = useState(!id ? new Student(uuidv4()) : getStudentById(id)); //Creates an new or edit form
  const isNew = !id ? "new" : "edit";
  return (
    <LanguageContext.Provider value={language}>
      <div className="w-full flex justify-center p-2">
        <Link className="font-secondary btn-primary flex gap-1 justify-center" to={`/home/${language}`}>
=======
export const LanguageContext = createContext<string>("english");

const SPRForm = () => {
  const { language ="english", id } = useParams<{language?: string; id?: string}>();

  const initialStudent = !id? new Student(uuidv4()) : getStudentById(id);
  const [inputData, setInputData] = useState<Student>(initialStudent); //Creates an new or edit form
  return (
    <LanguageContext.Provider value={language}>
      <div className="font-secondary w-full flex justify-center p-2">
        <Link className="btn-primary flex gap-1 justify-center" to={`/home/${language}`}>
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
        <House />
          Home
        </Link>
      </div>
<<<<<<< HEAD
      <Form inputData={inputData} setInputData={setInputData} isNew={isNew} />
=======
      <PlotForm inputData={inputData} setInputData={setInputData} />
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
    </LanguageContext.Provider>
  );
};

export default SPRForm;
