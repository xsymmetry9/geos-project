import React, {useState} from "react";
import PropTypes from "prop-types";
import labelText from "../../../assets/other/labelText.json"

const PersonalInformation = ({ key, inputData, inputError, handleInputData, language }) => {
  const { name, course, textbook, attendance, totalLessons } = inputData;

  //translation
  const {
    input_name,
    input_course,
    input_textbook,
    input_attendance,
    input_totallessons,
  } = labelText[language].form;

  return (
    <div key={key} className="pb-[3rem]" id="personal-information">
      <h2 className="bg-[#00646c] text-xl text-white text-center p-2 font-bold capitalize">{labelText[language].SPR["student_information"]}</h2>
      <div className="mt-8 m-auto">
        <div className="grid grid-cols-1 gap-6">
        <label className="block" htmlFor="name">
          <span className="text-gray-700 capitalize">{input_name}</span>
          <input
          type="text"
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]"
          name="name"
          value={name}
          onChange={handleInputData}
        />
        {inputError.name && <p className="text-red-600 text-sm">Missing text</p>}
        </label>
        <label className="block" htmlFor="course">
          <span className="text-gray-700 capitalize">{input_course}</span>
          <select
          className="font-primary text-base text-black block w-full mt-1 px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]"
          id="course"
          name="course"
          value={course}
          onChange={handleInputData}
        >
          <option className="font-secondary text-base text-inherit" value="">
            Select course
          </option>
          <option className="font-secondary text-base text-inherit" value="ONLINE">
            ONLINE
          </option>
          <option className="font-secondary text-base text-inherit" value="PL">
            PL
          </option>
          <option className="font-secondary text-base text-inherit" value="2PL">
            2PL
          </option>
          <option className="font-secondary text-base text-inherit" value="FLEX">
            FLEX
          </option>
          <option className="font-secondary text-base text-inherit" value="SGL">
            SGL
          </option>
          <option className="font-secondary text-base text-inherit" value="GL">
            GL
          </option>
        </select>
        {inputError.course && <p className="text-red-600 text-sm">Missing course</p>}
        </label>
        <label className="block" htmlFor="textbook">
          <span className="text-gray-700 capitalize">{input_textbook}</span>
          <input
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0  focus:border-[#09c5eb] hover:border-[#09c5eb]"
          type="text"
          name="textbook"
          value={textbook}
          onChange={handleInputData}
        />
        {inputError.textbook && <p className="text-red-600 text-sm">Missing textbook</p>}

        </label>
        <label className="block" htmlFor="attendance">
          <span className="text-gray-700 capitalize">{input_attendance}</span>
          <input
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0  focus:border-[#09c5eb] hover:border-[#09c5eb]" 
          type="number"
          name="attendance"
          id="attendance"
          value={attendance}
          onChange={handleInputData}
        />
        {inputError.attendance && <p className="text-red-600 text-sm">Needs to be greater than 0 and a whole number</p>}

        </label>
        <label className="block" htmlFor="totalLessons">
          <span className="text-gray-700 capitalize">{input_totallessons}</span>
          <input
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0  focus:border-[#09c5eb] hover:border-[#09c5eb]"
          type="number"
          name="totalLessons"
          id="total-lesson"
          value={totalLessons}
          onChange={handleInputData}
        />
        {inputError.totalLessons && <p className="text-red-600 text-sm">Needs to be greater than 0 and greater than attended lessons</p>}

        </label>
        </div>
      </div>

    </div>
  );
};

PersonalInformation.propTypes = {
  key: PropTypes.string,
  inputData: PropTypes.object,
  handleInputData: PropTypes.func,
  language: PropTypes.string,
};
export default PersonalInformation;
