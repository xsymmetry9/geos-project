import React from "react";
import PropTypes from "prop-types";

const Feedback = ({ key, inputData, handleInputData, language }) => {
  const { feedback } = inputData;

  const placeholderContent = {
    english: "Your comment",
    korean: "댓글이 여기에 작성됩니다",
    japanese: "コメントがここに入ります",
    chinese: "評論在此處輸入",
  };

  return (
    <div key={key} className="form-primary">
      <h2 className="title text-2 p-2">Feedback</h2>
      <p className="text-2 p-t-3">
        <label htmlFor="">{placeholderContent[language]}</label>
      </p>
      <div className="input-wrapper" id="feedback">
        <textarea
          name="feedback"
          id="feedback"
          value={feedback}
          onChange={handleInputData}
          placeholder={placeholderContent[language.toLowerCase()]}
        ></textarea>
      </div>
    </div>
  );
};

Feedback.propTypes = {
  key: PropTypes.string,
  inputData: PropTypes.object,
  handleInputData: PropTypes.func,
  language: PropTypes.string,
};
export default Feedback;
