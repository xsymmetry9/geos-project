import { useNavigate } from "react-router-dom";
import { Language } from "@/utils/common";
import { useUser } from "@/context/UserContext";

const LanguagePage = () => {
  const { setLanguage } = useUser();
  const navigate = useNavigate();

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language);
    navigate("/home");
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="font-secondary text-center text-2xl font-bold">GEOS App</h1>
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
