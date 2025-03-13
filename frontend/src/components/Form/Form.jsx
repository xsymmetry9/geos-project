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

const PlotForm = ({ inputData, setInputData }) => {
  const [page, setPage] = useState(0);
  const [displayPopupMessage, setDisplayPopupMessage] = useState(false);

  const language = useContext(LanguageContext);

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLevelInputData = (e) => {
    const { name, value } = e.currentTarget;

    const parentCategory = name.split("-")[0];
    const childCategory = name.split("-")[1];
    console.log(value);

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
      handleInputData={handleInputData}
      language={language}
    />,
    <LevelInformation
      key={"level-information"}
      inputData={inputData}
      setInputData={setInputData}
      handleLevelInputData={handleLevelInputData}
      language={language}
    />,
    <Feedback
      key={"feedback"}
      inputData={inputData}
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
              <input className="btn btn-primary" type="submit" value={"Save"} />
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
