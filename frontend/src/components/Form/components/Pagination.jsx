import PropTypes from "prop-types";
// import "../../../styles/components/pagination.scss";
import React from "react";

const Pagination = ({ page, language }) => {
  const title = {
    english: ["Info", "Level", "Feedback", "Done"],
    korean: ["정보", "레벨", "피드백", "완료"],
    chinese: ["資訊", "級別", "反饋", "完成"],
    japanese: ["情報", "レベル", "フィードバック", "完了"],
  };

  return (
    <div className="w-full max-w-lg m-auto">
      <div className="pagination-container">
        {title[language.toLowerCase()].map((item, index) => (
          <div key={index} className={`square ${page === index && "active"}`}>
            <div className={"circle"}>{index}</div>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  language: PropTypes.string,
};

export default Pagination;
