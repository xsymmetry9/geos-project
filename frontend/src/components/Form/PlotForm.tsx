import React, { useState } from "react";
import { Save } from "lucide-react";
import PersonalInformation from "@/components/Form/components/PersonalInformation";
import Feedback from "@/components/Form/components/Feedback";
import LevelInformation from "@/components/Form/components/LevelInformation";
import Preview from "@/components/Form/components/Preview";
import Pagination from "@/components/Form/components/Pagination";
import Button from "@/components/Form/components/Button";
import { useUser } from "@/context/UserContext";
import PopUpMessage from "@/components/PopUpMessage";
import labelText from "@/assets/other/labelText.json";
import { Student, Levels } from "@/type/Student";
import { getDataFromLocal, editDataFromLocal } from "@/utils/functions";

type LevelCategory = keyof Student["levels"];
type LevelField = keyof Levels;

interface PlotFormProps {
  inputData: Student;
  setInputData: React.Dispatch<React.SetStateAction<Student>>;
}

const PlotForm: React.FC<PlotFormProps> = ({ inputData, setInputData }) => {
  const [page, setPage] = useState<number>(0);
  const [displayPopupMessage, setDisplayPopupMessage] = useState<boolean>(false);
  const [inputError, setInputError] = useState({
    name: inputData.name == "" ? true : false,
    textbook: inputData.textbook == "" ? true : false,
    course: inputData.course == "" ? true : false,
    attendance: inputData.attendance == 0 ? true : false,
    totalLessons: inputData.totalLessons == 0 ? true : false,
    feedback: inputData.feedback == "" ? true : false,
  });

  const { user } = useUser();
  const language = user?.language ?? "english";

  const handleInputData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    if (name === "dateCreated") {
      setInputData((prev) => ({
        ...prev,
        dateCreated: new Date(value),
      }));
      return;
    }

    if (name === "attendance" || name === "totalLessons") {
      const digits = value.replace(/\D/g, "");
      const nextValue = digits === "" ? 0 : Number(digits);
      const attendance = name === "attendance" ? nextValue : inputData.attendance;
      const totalLessons = name === "totalLessons" ? nextValue : inputData.totalLessons;

      setInputData((prev) => ({ ...prev, [name]: nextValue }));
      setInputError((prevError) => ({
        ...prevError,
        attendance: attendance <= 0,
        totalLessons: totalLessons <= 0 || totalLessons < attendance,
      }));
      return;
    }

    setInputData((prev) => ({ ...prev, [name]: value }));

    setInputError((prevError) => {
      switch (name) {
        case "name":
        case "textbook":
        case "course":
          return { ...prevError, [name]: value.trim() === "" };
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
      inputError={inputError}
      handleInputData={handleInputData}
      language={language}
    />,
    <LevelInformation
      key={"level-information"}
      inputData={inputData}
      inputError={inputError}
      setInputData={setInputData}
      handleLevelInputData={handleLevelInputData}
      language={language}
    />,
    <Feedback
      key={"feedback"}
      inputData={inputData}
      inputError={inputError}
      setInputError={setInputError}
      setInputData={setInputData}
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
    try {
      const savedData = getDataFromLocal();
      const existingStudentIndex = savedData.SPR.findIndex(
        (student) => student.id === inputData.id
      );
      if (existingStudentIndex === -1) {
        savedData.SPR.push(inputData);
      } else {
        const existing = savedData.SPR[existingStudentIndex];
        savedData.SPR[existingStudentIndex] = {
          ...inputData,
          cloudUrl: inputData.cloudUrl || existing.cloudUrl || "",
        };
      }
      editDataFromLocal(savedData);
    } catch (err) {
      alert(err);
    }

    setDisplayPopupMessage(true);
  };
  return (
    <div className="relative w-full">
      {displayPopupMessage && (
        <PopUpMessage formId={inputData.id} setDisplayPopupMessage={setDisplayPopupMessage} />
      )}
      <div className="panel p-4 sm:p-6">
        <Pagination page={page} language={language} setPage={setPage} />
        <div className="mx-auto mt-6 w-full max-w-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {arrOfPages[page]}
            <div className="form-actions" id="buttons">
              <Button page={page} handler={changePage} language={language} />
              {page == 3 && (
                <button className="form-nav-btn form-nav-btn-save" type="submit">
                  <Save size={16} aria-hidden="true" />
                  <span>{labelText[language].save}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PlotForm;
