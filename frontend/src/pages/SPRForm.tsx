import { useState, createContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import PlotForm from "../components/Form/PlotForm";
import { StudentProgressReportEntry } from "../type/StudentProgressReportEntry";

export const LanguageContext = createContext<string>("english");

const SPRForm = () => {
  const location = useLocation();
  const formData = location.state;
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
      formId: formData.formId,
      name: formData.studentName,
      studentId: studentId ?? "",
      teacherEmail: formData.teacherEmail,
      language: preferedLanguage
    }));
  },[studentId, language, formData]);

  return (
    <LanguageContext.Provider value={language}>
      {!loading && 
        <PlotForm inputData={inputData} setInputData={setInputData} loading = {loading} setLoading ={setLoading} />
      }
    </LanguageContext.Provider>

  );
  
};

export default SPRForm;
