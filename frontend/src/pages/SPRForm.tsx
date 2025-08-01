import { useState, createContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import PlotForm from "../components/Form/PlotForm";
import { StudentProgressReportEntry, Levels } from "../type/StudentProgressReportEntry";
import axios from "axios";

export const LanguageContext = createContext<string>("english");

export const SPRForm = () => {
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

    if(!formData) return;

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

export const EditSPRForm = () => {

  let location = useLocation();
  const formData = location.state;
  let params = useParams();
  const studentFormID = params.formId; 
  const initiateStudent = new StudentProgressReportEntry();
  const [inputData, setInputData] = useState<StudentProgressReportEntry>(initiateStudent);
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("english");
  const [backendErrorMessage, setBackendErrorMessage] = useState<string>(""); 

  useEffect(() => {
    const fetchApi = async () => {
      try{
        let token = localStorage.getItem("token");
        if(!token){
          setBackendErrorMessage("No token, login again");
          return;
        }

        const result = await axios.get(`http://localhost:8000/api/member/getSPR/${studentFormID}`, {
          headers: { Authorization: `Bearer ${token}`},
        });

        console.log(result);
        const data = result.data;

        setLanguage(data.language);
        setInputData((prev) => ({
          ...prev,
          name: data.studentName,
          dateCreated: data.dateCreated,
          textbook: data.textbook,
          attendance: data.attendance,
          totalLessons: data.totalLessons,
          feedback: data.feedback,
          course: data.course,
          levels: {
              vocabulary: new Levels(data.vocabularyInitial, data.vocabularyTarget, data.vocabularyFinal),
              pronunciation: new Levels(data.pronunciationInitial, data.pronunciationTarget, data.pronunciationFinal),
              grammar: new Levels(data.grammarInitial, data.grammarTarget, data.grammarFinal),
              conversation: new Levels(data.speakingInitial, data.speakingTarget, data.speakingFinal),
              listening: new Levels(data.listeningInitial, data.listeningTarget, data.listeningFinal),
          }

        }))
      } catch(error){
      setBackendErrorMessage("Error");
      } finally {
        setLoading(false);
      }
    }
    
    setLoading(true);
    if(formData) return setLoading(false);

    fetchApi();
  }, [formData]);
  
  if(loading) return <p>Loading ...</p>

  return(
    <LanguageContext.Provider value={language}>
      {!backendErrorMessage && <p className="text-red">{backendErrorMessage}</p>}
      <PlotForm inputData = {inputData} setInputData={setInputData} loading={loading} setLoading={setLoading}/>
    </LanguageContext.Provider>
  )

}

