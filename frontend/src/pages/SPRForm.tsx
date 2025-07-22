import { useState, createContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PlotForm from "../components/Form/PlotForm";
import { Student } from "../type/Student";
import { getStudentById } from "../utils/functions";
import { House } from "lucide-react";
import axios from "axios";

export const LanguageContext = createContext<string>("english");

const SPRForm = () => {
  let navigate = useNavigate();
  let parameters = useParams();
  const preferedLanguage = parameters.language ? parameters.language : "english";
  const studentId = parameters.id
  const { language ="english", id } = useParams<{language?: string; id?: string}>();
  const [loading, setLoading] = useState<boolean>(false);

  const initialStudent = new Student(uuidv4());
  const [inputData, setInputData] = useState<Student>(initialStudent); //Creates an new or edit form
  console.log(initialStudent);
  useEffect(() =>{
    setLoading(true);

    try{
      const token = localStorage.getItem("token");
      if(!token) {
        navigate("/login");
      }

    } catch(error){
      navigate("/login");

    } finally{
    setLoading(false);
    }
  })
  return (
    <LanguageContext.Provider value={language}>
      {/* <PlotForm inputData={inputData} setInputData={setInputData} /> */}
    </LanguageContext.Provider>

  );
  
};

export default SPRForm;
