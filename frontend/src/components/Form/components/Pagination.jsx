import "../../../styles/components/pagination.scss";
import React from "react";

const Pagination = ({page, language}) =>{
  const arr = ["Info", "Level", "Feedback", "Done"];
  const title = {
    "english": ["Info", "Level", "Feedback", "Done"],
    "korean": ["정보", "레벨", "피드백", "완료"],
    "chinese": ["資訊", "級別", "反饋", "完成"],
    "japanese": ["情報", "レベル", "フィードバック", "完了"] 
  };
    
  return(
    <div className="root-pagination">
      <div className="pagination-container">
        {title[language.toLowerCase()].map((item, index) => (
          <div key= {index} className={`square ${(page === index) && "active"}`}>
            <div className={"circle"}>{index}</div>
            <p>{item}</p>
          </div>))}
         
      </div>
    </div>
  );
};

export default Pagination;