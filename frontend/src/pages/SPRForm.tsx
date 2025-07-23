import { useState, createContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlotForm from "../components/Form/PlotForm";
import { StudentProgressReportEntry } from "../type/StudentProgressReportEntry";
// import { getStudentById } from "../utils/functions";
import { House } from "lucide-react";
import axios from "axios";

export const LanguageContext = createContext<string>("english");

const SPRForm = () => {
  let navigate = useNavigate();
  let parameters = useParams();
  const preferedLanguage = parameters.language ? parameters.language : "english";
  const studentId = parameters.id
  const { language ="english", id } = useParams<{language?: string; id?: string}>();
  
  const initialStudent = new StudentProgressReportEntry(); // Initialize SPR
  const [inputData, setInputData] = useState<StudentProgressReportEntry>(initialStudent); //Creates an new or edit form
  const [loading, setLoading] = useState<boolean>(false);

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
      {!loading && 
        <PlotForm inputData={inputData} setInputData={setInputData} />
      }
    </LanguageContext.Provider>

  );
  
};

export default SPRForm;
