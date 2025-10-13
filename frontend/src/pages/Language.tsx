import { useNavigate } from "react-router-dom";
import { Language } from "@/utils/common";
import { useUser } from "@/context/UserContext";

const LanguagePage = () => {
  const {setLanguage} = useUser();;
  const navigate = useNavigate();

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language);
    navigate(`/home`);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center font-secondary">
          GEOS App
        </h1>
        <button className="btn-primary w-full" onClick={() => handleLanguageSelect("english")}>
          English
        </button>
        <button className="btn-primary w-full" onClick={() => handleLanguageSelect("chinese")}>
          Chinese
        </button>
        <button className="btn-primary w-full" onClick={() => handleLanguageSelect("korean")}>
          Korean
        </button>
        <button className="btn-primary w-full" onClick={() => handleLanguageSelect("japanese")}>
          Japanese
        </button>
      </div>
    </div>
  );
};

export default LanguagePage;
