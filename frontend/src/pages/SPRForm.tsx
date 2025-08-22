import { useState, createContext, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PlotForm from "../components/Form/PlotForm";
import { StudentProgressReportEntry, Levels } from "../type/StudentProgressReportEntry";
import axios from "axios";
import Pagination from "@/components/Form/components/Pagination";
import PersonalInformation from "@/components/Form/components/PersonalInformation";
import LevelInformation from "@/components/Form/components/LevelInformation";
import Feedback from "@/components/Form/components/Feedback";
import Button from "@/components/Form/components/Button";
import Preview from "@/components/Form/components/Preview";
import API_BASE_URL from "@/api/axiosInstance";

type LevelCategory = keyof StudentProgressReportEntry["levels"];

export const LanguageContext = createContext<string>("english");

export const SPRForm = () => {
  const location = useLocation();
  const formData = location.state;
  let parameters = useParams();
  const preferedLanguage = parameters.language ? parameters.language : "english";
  const studentId = parameters.studentId
  
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
  },[studentId, preferedLanguage, formData]);

  return (
    <LanguageContext.Provider value={preferedLanguage}>
      {!loading && 
        <PlotForm inputData={inputData} setInputData={setInputData} loading = {loading} setLoading ={setLoading} />
      }
    </LanguageContext.Provider>

  );
  
};

export const EditSPRForm = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const formData = location.state;
  let params = useParams();
  const studentFormID = params.formId; 
  const initiateStudent = new StudentProgressReportEntry();
  const [inputData, setInputData] = useState<StudentProgressReportEntry>(initiateStudent);
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("english");
  const [backendErrorMessage, setBackendErrorMessage] = useState<string>(""); 
  const [page, setPage] = useState<number>(0)
  const [inputError, setInputError]= useState({
    textbook: inputData.textbook == "" ? true: false,
    course: inputData.course == "" ? true : false,
    attendance: inputData.attendance === 0 ? true : false,
    totalLessons: inputData.totalLessons == 0 ? true : false,
    feedback: inputData.feedback == "" ? true : false
  })

  const handleInputData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) : void => {
      const { name, value } = e.target;
  
      // Update input data (convert numbers where necessary)
      const numericFields = ["attendance", "totalLessons"];
      const newValue = numericFields.includes(name) ? Number(value) : value;
  
      setInputData((prev) => ({ ...prev, [name]: newValue }));
  
      setInputError((prevError) => {
        switch (name) {
          case "name":
          case "textbook":
          case "course":
            return {...prevError, [name]: value.trim() === ""};
          case "feedback":
            return {...prevError, feedback: value.trim() === "" || value.length > 475}
          case "attendance":
            const att = Number(value);
            return {...prevError, attendance: isNaN(att) || att <= 0};
          case "totalLessons":
            const total = Number(value);
            return {
              ...prevError, 
              totalLessons: isNaN(total) || total <= 0 || total < Number(inputData.attendance),
            };
          default:
            return prevError;
        }
      });
    };

  const handleLevelInputData = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;
    const [parentCategoryRaw, childCategoryRaw] = name.split("-");
    const parentCategory = parentCategoryRaw as LevelCategory;
    const childCategory = childCategoryRaw as LevelCategory; 

     setInputData((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        [parentCategory]: {
          ...prev.levels[parentCategory],
          [childCategory]: value,
        },
      },
    }));

  }

  const changePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {name} = e.currentTarget;
    if(name === "next") {
      if(page > arrOfPages.length -1) {
        setPage(0);
      } else {
        setPage((prev)  => prev + 1);
    } 
    } else {
      setPage((prev) => prev -1);
    } 

  }
  useEffect(() => {
    const fetchApi = async () => {
      try{
        let token = localStorage.getItem("token");
        if(!token){
          setBackendErrorMessage("No token, login again");
          return;
        }

        const result = await axios.get(`${API_BASE_URL}/api/member/getSPR/${studentFormID}`, {
          headers: { Authorization: `Bearer ${token}`},
        });

        const data = result.data;

        setLanguage(data.language);
        setInputData((prev) => ({
          ...prev,
          formId: data.id,
          teacherEmail: data.teacherEmail,
          studentId: data.studentId,
          name: data.studentName,
          dateCreated: data.dateCreated,
          textbook: data.textbook,
          attendance: data.attendance,
          totalLessons: data.totalLessons,
          feedback: data.feedback,
          language: data.language,
          course: data.course,
          levels: {
              vocabulary: new Levels(data.vocabularyInitial, data.vocabularyTarget, data.vocabularyFinal),
              pronunciation: new Levels(data.pronunciationInitial, data.pronunciationTarget, data.pronunciationFinal),
              grammar: new Levels(data.grammarInitial, data.grammarTarget, data.grammarFinal),
              conversation: new Levels(data.speakingInitial, data.speakingTarget, data.speakingFinal),
              listening: new Levels(data.listeningInitial, data.listeningTarget, data.listeningFinal),
          }

        }));
        
        setInputError((prevError) => ({
          ...prevError,
          course: data.course == "" ? true : false,
          textbook: data.textbook === "" ? true : false,
          attendance: data.attendance === "" ? true : false,
          totalLessons: data.totalLessons === "" ? true : false,
          feedback: data.feedback === "" ? true : false,

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

  const arrOfPages = [
    <PersonalInformation 
      key= "personal-information"
      inputData={inputData}
      inputError={inputError}
      handleInputData={handleInputData}
      language = {language} />,
      <LevelInformation
      key= "level-information" 
      inputData={inputData}
      inputError={inputError}
      setInputData={setInputData}
      handleLevelInputData={handleLevelInputData}
      language= {language}
      />,
      <Feedback 
      key="feedback"
      inputData = {inputData}
      inputError = {inputError}
      handleInputData = {handleInputData}
      language= {language} />,
      <Preview 
      key ="preview"
      inputData = {inputData}
      language= {language} />
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const fetchId = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          if(!token) {
            console.error("No token, login first");
            return;
          }

          console.log("Form ID is: ", inputData.formId);

          const res = await axios.put(`${API_BASE_URL}/api/member/updateSPR/${inputData.formId}`,
            { data: inputData },
            { headers: { Authorization: `Bearer ${token}`},
          });

          navigate(`/spr/${inputData.studentId}/print/${inputData.formId}`, {
            state: inputData,
            replace: true});
        } catch(err) {

        } finally{
          setLoading(false);
        }
      }
      // Test if it can fetch.
      const hasError = Object.keys(inputError).filter((item) => inputError[item] === true);

      if(hasError.length === 0){
        fetchId();
      } else {
        console.log(hasError.map((item) => item));
      }
    }
  
  if(loading) return <p>Loading ...</p>

  return(
    <LanguageContext.Provider value={language}>
      <div className="w-full max-w-[55rem] relative bg-white p-3 mx-auto relative">
        {!backendErrorMessage && <p className="text-red">{backendErrorMessage}</p>}
        <Pagination page = {page} language = {language} setPage = {setPage} />
        <div className="w-full static max-wg-lg m-auto">
          <form onSubmit={handleSubmit} autoComplete="false">
            {arrOfPages[page]}
            <div className="flex gap-2 justify-center" id="buttons">
              <Button page= {page} handler={changePage} language = {language} />
              {page === arrOfPages.length -1 && <input className="btn btn-primary w-32" type="submit" value={"Save"}/>}
            </div>
          </form>
          
        </div>
      </div>

    </LanguageContext.Provider>
  )

}

