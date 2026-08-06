import { useNavigate } from "react-router-dom";
import { Language } from "@/utils/common";
import { useUser } from "@/context/UserContext";
import geosImg from "/logo.jpg";

const languages: { id: Language; label: string; native: string }[] = [
  { id: "english", label: "English", native: "English" },
  { id: "chinese", label: "Chinese", native: "中文" },
  { id: "korean", label: "Korean", native: "한국어" },
  { id: "japanese", label: "Japanese", native: "日本語" },
];

const LanguagePage = () => {
  const { setLanguage } = useUser();
  const navigate = useNavigate();

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language);
    navigate("/home");
  };

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-10">
      <div className="panel w-full max-w-md p-8">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <img className="w-24" src={geosImg} alt="GEOS logo" />
          <h1 className="font-secondary text-2xl font-bold text-ink">GEOS App</h1>
          <p className="text-sm text-muted">Choose a language to continue</p>
        </div>
        <div className="flex flex-col gap-3">
          {languages.map((lang) => (
            <button
              key={lang.id}
              type="button"
              className="btn-primary flex w-full items-center justify-between"
              onClick={() => handleLanguageSelect(lang.id)}
            >
              <span>{lang.label}</span>
              <span className="text-sm font-normal opacity-80">{lang.native}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagePage;
