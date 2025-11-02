// src/pages/LevelCheckPage.tsx
import { useState } from "react";
import LevelCheckForm from "@/pages/LevelCheckPage/LevelCheckForm";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { Language } from "@/utils/common";
import { CjkEntry, EnglishEntry } from "@/type/LevelCheckForm";

const LevelCheckPage = () => {
  const [inputData, setInputData] = useState<EnglishEntry | CjkEntry >(new EnglishEntry());
  const [language, setLanguage] = useState<Language | "">("");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setLanguage(value as Language);

    if (value === "english") {
      const initForm = new EnglishEntry();
      initForm.language = "english";
      setInputData(initForm);
    } else {
      const initForm = new CjkEntry();
      initForm.language = value;
      setInputData(initForm);
    } 
  };

  return (
    <div className="relative h-screen w-full bg-green-50 overflow-hidden min-[600px]:grid min-[600px]:grid-cols-[minmax(0,600px)_1fr]">
      <aside className="h-full lg:bg-orange-50 md:w-full lg:max-w-[600px] overflow-y-auto bg-white max-[600px]:block min-[600px]:border-r-2 min-[600px]:border-slate-300">
        <div className="flex flex-col gap-2 p-4">
          <select className="text-md border-2 border-slate-600 rounded p-1" name="language" onChange={handleLanguageChange} id="language" value={language}>
            <option value = "">Enter Language</option>
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
            <option value="korean">Korean</option>
            <option value="japanese">Japanese</option>
          </select>
        </div>
        {language !== "" && <LevelCheckForm inputData={inputData} setInputData={setInputData} />}
      </aside>

      <section className="relative hidden lg:min-[600px]:block">
        <div className="sticky top-0 h-screen w-full overflow-auto p-4">
          <div className="print-component-landscape">
            {language !== "" && inputData !== null && <PlotLevelCheck data={inputData} />}  
          </div>
        </div>
      </section>
    </div>
  );
};

export default LevelCheckPage;
