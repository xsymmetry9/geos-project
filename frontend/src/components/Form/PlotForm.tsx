import React, { useContext, useState } from "react";
import PersonalInformation from "./components/PersonalInformation";
import Feedback from "./components/Feedback";
import LevelInformation from "./components/LevelInformation";
import Preview from "./components/Preview";
import Pagination from "./components/Pagination";
import Button from "./components/Button";
import { LanguageContext } from "@/pages/SPRForm";
import PopUpMessage from "../PopUpMessage";
import labelText from "@/assets/other/labelText.json"
import { StudentProgressReportEntry, Levels } from "@/type/StudentProgressReportEntry";
import { getDataFromLocal, editDataFromLocal } from "@/utils/functions";
import { Language } from "@/utils/common";
import axios from "axios";

type LevelCategory = keyof StudentProgressReportEntry["levels"];
type LevelField = keyof Levels;

interface PlotFormProps{
  inputData: StudentProgressReportEntry;
  setInputData: React.Dispatch<React.SetStateAction<StudentProgressReportEntry>>;
}

const PlotForm: React.FC<PlotFormProps> = ({ inputData, setInputData, setLoading }) => {
  const [page, setPage] = useState<number>(0);
  const [displayPopupMessage, setDisplayPopupMessage] = useState<boolean>(false);
  const [inputError, setInputError] = useState({
    name: inputData.name == "" ? true : false,
    textbook: inputData.textbook == "" ? true : false,
    course: inputData.course == "" ? true : false,
    attendance: inputData.attendance == 0 ? true : false,
    totalLessons: inputData.totalLessons == 0 ? true : false,
    feedback: inputData.feedback == "" ? true : false
  });

  const language = useContext(LanguageContext) as Language;

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

  const handleLevelInputData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [parentCategoryRaw, childCategoryRaw] = name.split("-");
    const parentCategory = parentCategoryRaw as LevelCategory;
    const childCategory = childCategoryRaw as LevelField;

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
  };
  const arrOfPages = [
    <PersonalInformation
      key={"personal-information"}
      inputData={inputData}
      inputError = {inputError}
      handleInputData={handleInputData}
      language={language}
    />,
    <LevelInformation
      key={"level-information"}
      inputData={inputData}
      inputError = {inputError}
      setInputData={setInputData}
      handleLevelInputData={handleLevelInputData}
      language={language}
    />,
    <Feedback
      key={"feedback"}
      inputData={inputData}
      inputError = {inputError}
      handleInputData={handleInputData}
      language={language}
    />,
    <Preview key={"preview"} inputData={inputData} language={language} />,
  ];

  const changePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (name === "next") {
      if (page > arrOfPages.length - 1) {
        setPage(0);
      } else {
        setPage((prev) => prev + 1);
      }
    } else if (name === "back") {
      setPage((prev) => prev - 1);
    } else if (name === "preview") {
      alert("Error");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputData);
      const fetchId = async ()=> {
          setLoading(true);    
          try{
              const token = localStorage.getItem("token");
              if(!token) {
              console.error("No token, login first to create a new token");
              return;
              }
             const res = await axios.post(`http://localhost:8000/api/member/createSPR/${inputData.studentId}`,
              {studentId: inputData.studentId, data: inputData},
              {
                headers: { Authorization: `Bearer ${token}`},
              });

              if(res.data?.data){
              setInputData(res.data.data);
              }
    
              return res;
            } catch(error){
            console.error("Error was found", error);
            return;
            } finally {
              setLoading(false);
            };
          };
          
          fetchId();
        }
  return (
    <div className="w-full max-w-[55rem] relative bg-white p-3 mx-auto">
        {/* {displayPopupMessage && (
          <PopUpMessage setDisplayPopupMessage={setDisplayPopupMessage} />
        )} */}
      <Pagination page={page} language={language} setPage={setPage}/>
      <div className="w-full static max-w-lg m-auto">
        <form onSubmit={handleSubmit}>
          {arrOfPages[page]}
          <div className="flex gap-2 justify-center" id="buttons">
            <Button
              page={page}
              handler={changePage}
              language={language}
            />
            {page == 3 && (
              <input className="btn btn-primary" type="submit" value={labelText[language].save} />
            )}
          </div>  
        </form>
    
    </div>
    </div>
  );
};
export default PlotForm;
