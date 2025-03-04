import React from "react";
import PropTypes from "prop-types";
import form_languages from "../form_languages.js";

const PersonalInformation = ({key, inputData, handleInputData, language}) =>{
  const {name, course, textbook, attendance, totalLessons} = inputData;

  //translation
  const {
    input_name,
    input_course,
    input_textbook,
    input_attendance,
    input_totallessons} = form_languages[language.toLowerCase()];

  return(
    <div key={key} className="form-primary" id="personal-information">
      <h2 className="title text-2 p-2">Student&apos;s Information</h2>    
      <div className="input-wrapper p-t-3">
        <label className="text-2 uppercase" htmlFor="name">{input_name}</label>
        <input type="text" className="text-2" name="name" value={name} onChange={handleInputData} />
      </div>
      <div className="input-wrapper">
        <label className="text-2 uppercase" htmlFor="course">{input_course}</label>
        <select className="text-2 form-input-primary" id="course" name="course" value={course} onChange={handleInputData}>
          <option className="text-2" value="">Select course</option>
          <option className="text-2" value="ONLINE">ONLINE</option>
          <option className="text-2" value="PL">PL</option>
          <option className="text-2" value="GL">GL</option>
          <option className="text-2" value="SGL">SGL</option>
          <option className="text-2" value="FLEX">FLEX</option>
        </select>
      </div>
      <div className="input-wrapper">
        <label className="text-2 uppercase" htmlFor="textbook">{input_textbook}</label>
        <input className="text-2" type="text" name="textbook" value={textbook} onChange={handleInputData} />
      </div>
      <div className="input-wrapper">
        <label className="text-2 uppercase" htmlFor="attendance">{input_attendance}</label>
        <input className="text-2" type="number" name="attendance" id="attendance" value={attendance} onChange={handleInputData}/>
      </div>
      <div className="input-wrapper">
        <label className="text-2 uppercase" htmlFor="totalLessons">{input_totallessons}</label>
        <input className="text-2" type="number" name="totalLessons" id="total-lesson" value={totalLessons} onChange={handleInputData}/>
      </div>
    </div>
  );
};

PersonalInformation.propTypes = 
{
  key: PropTypes.string,
  inputData: PropTypes.obj,
  handleInputData: PropTypes.func,
  language: PropTypes.string,
  
};
export default PersonalInformation;