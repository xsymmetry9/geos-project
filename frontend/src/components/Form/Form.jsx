import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import PersonalInformation from "./components/PersonalInformation";
import Feedback from "./components/Feedback";
import LevelInformation from "./components/LevelInformation";
import Preview from "./components/Preview";
import Pagination from "./components/Pagination";
import Button from "./components/Button";
import { LanguageContext } from "../../pages/SPRForm";
import PopUpMessage from "../PopUpMessage";
import { editDataFromLocal, getStudentById } from "../../utils/functions";

import labelText from "../../assets/other/labelText.json"

const PlotForm = ({ inputData, setInputData }) => {
  const [page, setPage] = useState(0);
  const [displayPopupMessage, setDisplayPopupMessage] = useState(false);
  const [inputError, setInputError] = useState({
    name: inputData.name == "" ? true : false,
    textbook: inputData.textbook == "" ? true : false,
    course: inputData.course == "" ? true : false,
    attendance: inputData.attendance == 0 || inputData.attendance == "" ? true : false,
    totalLessons: inputData.toalLessons == 0 || inputData.totalLessons == "" ? true : false,
    feedback: inputData.feedback == "" ? true : false
  });

  const language = useContext(LanguageContext);

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));

    if(name === "name"  || name === "textbook" || name ==="course")
    {
      setInputError((prevError) => ({
        ...prevError,
        [name]: value.trim() === "",
      }))
    } else if(name === "attendance")
    {
      setInputError((prevError) => ({
        ...prevError,
        [name]: value <= 0 || value.trim() === ""
      }))
    } else if(name === "totalLessons")
    {
      setInputError((prevError) =>({
        ...prevError,
        [name]: value.trim() === "" || value <= 0 || value < parseInt(inputData.attendance)
      }))
    } else if(name === "feedback") {
      setInputError((prevError) => ({
        ...prevError, 
        [name]: value.trim() === ""
      }))
    }

  };

  const handleLevelInputData = (e) => {
    const { name, value } = e.currentTarget;
    const parentCategory = name.split("-")[0];
    const childCategory = name.split("-")[1];

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

  const changePage = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const savedData = JSON.parse(localStorage.getItem("GEOS_app"));
      const existingStudentIndex = savedData.SPR.findIndex(
        (student) => student.id === inputData.id,
      );
      if (existingStudentIndex === -1) {
        savedData.SPR.push(inputData);
      } else {
        savedData.SPR[existingStudentIndex] = inputData;
      }
      localStorage.setItem("GEOS_app", JSON.stringify(savedData));
    } catch (err) {
      alert(err);
    }

<<<<<<< HEAD
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            const savedData = JSON.parse(localStorage.getItem("GEOS_app"));

            const existingStudentIndex = savedData.SPR.findIndex(student => student.id === inputData.id);

            if (existingStudentIndex === -1) {
                // If student does not exist, add new entry
                savedData.SPR.push(inputData);
            } else {
                // If student exists, update their data
                savedData.SPR[existingStudentIndex] = inputData;
            }
    
            // Save updated data back to localStorage
            editDataFromLocal(savedData);
    
            setDisplayPopupMessage(true);
 

            
        } catch (err) {
            console.log("Unable to load", err);
        }

        setDisplayPopupMessage(true);
    }
    return(
        <div className={`form-root`}>
            <Pagination page = {page} language={language}/>
            <div>
                <form onSubmit={handleSubmit}>
                    {arrOfPages[page]}
                    <div className="container" id="buttons">
                        <Button page={page} handler={changePage} language={language} handleSubmit = {handleSubmit} />
                        {page == 3 && <input className="btn btn-primary" type="submit" value={"Save"}/>}                   
                    </div>      
                </form>
                {displayPopupMessage && <PopUpMessage setDisplayPopupMessage = {setDisplayPopupMessage}/>}
            </div>
        </div>
    )
}

export default Form;
=======
    setDisplayPopupMessage(true);
  };
  return (
    <div className="w-full max-w-[55rem] relative bg-white p-3 mx-auto">
        {displayPopupMessage && (
          <PopUpMessage setDisplayPopupMessage={setDisplayPopupMessage} />
        )}
      <Pagination page={page} language={language} setPage={setPage}/>
      <div className="w-full static max-w-lg m-auto">
        <form onSubmit={handleSubmit}>
          {arrOfPages[page]}
          <div className="flex gap-2 justify-center" id="buttons">
            <Button
              page={page}
              handler={changePage}
              language={language}
              handleSubmit={handleSubmit}
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

PlotForm.propTypes = {
  inputData: PropTypes.object,
  setInputData: PropTypes.func,
};
export default PlotForm;
>>>>>>> 801b1729e44fb8be552d401c981161bf4f1f1e37
