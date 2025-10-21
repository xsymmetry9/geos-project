import labelText from "@/assets/other/labelText.json";

type Language = keyof typeof labelText;

interface PaginationProps {
  page: number;
  language: Language;
  setPage: (index: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ page, language, setPage }) => {
  const title: Record<Language, string[]> = {
    english: ["Info", "Level", "Feedback", "Review"],
    korean: ["정보", "레벨", "피드백", "완료"],
    chinese: ["資訊", "級別", "反饋", "完成"],
    japanese: ["情報", "レベル", "フィードバック", "完了"],
  };

  return (
    <div className="m-auto w-full max-w-lg">
      <div className="pagination-container">
        {title[language].map((item, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={`square cursor-pointer ${page === index && "active"}`}
          >
            <div className={"circle"}>{index}</div>
            <p>{item}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
