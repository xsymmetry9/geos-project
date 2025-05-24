import React from "react";
import PropTypes from "prop-types";
import labelText from "../../../assets/other/labelText.json";

const Feedback = ({ inputData, inputError, handleInputData, language }) => {
  const { feedback } = inputData;

  const placeholderContent = {
    english: "Your comment",
    korean: "댓글이 여기에 작성됩니다",
    japanese: "コメントがここに入ります",
    chinese: "評論在此處輸入",
  };

  return (
    <div className="">
      <h2 className="bg-[#00646c] text-xl text-white p-2 font-secondary font-bold capitalize text-center">{labelText[language].SPR["student_feedback"]}</h2>
      <p className="font-secondary text-gray-700 capitalize mt-2">
        <label htmlFor="">{placeholderContent[language]}</label>
      </p>
      <div className="grid grid-cols-1 mb-6" id="feedback">
        <textarea
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6"
          rows={5}
          name="feedback"
          id="feedback"
          value={feedback}
          onChange={handleInputData}
          placeholder={placeholderContent[language.toLowerCase()]}
        ></textarea>
        {inputError.feedback && <p className="text-red-600 text-sm">Please fill up the feedback section</p>}

      </div>
    </div>
  );
};

Feedback.propTypes = {
  inputData: PropTypes.object,
  handleInputData: PropTypes.func,
  language: PropTypes.string,
};
export default Feedback;
