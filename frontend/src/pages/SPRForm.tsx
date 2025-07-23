import { useState, createContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlotForm from "../components/Form/PlotForm";
import { StudentProgressReportEntry } from "../type/StudentProgressReportEntry";
// import { getStudentById } from "../utils/functions";
import { House } from "lucide-react";
import axios from "axios";
import TeacherPage from "./Admin/TeacherPage";

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

  useEffect(() => {
    setInputData((prev) => ({
      ...prev,
      studentId: studentId ?? "",
      language: preferedLanguage
    }));
  },[studentId, language]);
  //This is for auto save... not sure if i want this
    // useEffect(() => {
      
    //   const token = localStorage.getItem("token");
    //   if(!token) {
    //       console.error("No token, login first to create a new token");
    //       return;
    //     }

    //   const fetchId = async ()=> {
    //       setLoading(true);    
    //       try{
    //          const res = await axios.post(`http://localhost:8000/api/member/createSPR/${studentId}`,
    //           {studentId: studentId},
    //           {
    //             headers: { Authorization: `Bearer ${token}`},
    //           });

    //         if(res.data?.data){
    //           setInputData(res.data.data);
    //         }
    
    //         return res;
    //       } catch(error){
    //         console.error("Error was found", error);
    //         return;
    //       } finally {
    //           setLoading(false);
    //         };
    //       };
          
    //       fetchId();
    //     }, [studentId]);
  return (
    <LanguageContext.Provider value={language}>
      {!loading && 
        <PlotForm inputData={inputData} setInputData={setInputData} setLoading ={setLoading} />
      }
    </LanguageContext.Provider>

  );
  
};

export default SPRForm;
