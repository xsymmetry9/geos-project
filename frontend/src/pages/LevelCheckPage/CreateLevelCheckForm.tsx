// src/pages/LevelCheckPage.tsx
import { useState } from "react";
import LevelCheckForm from "@/pages/LevelCheckPage/LevelCheckForm";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { Language } from "@/utils/common";
import { CjkEntry, EnglishEntry } from "@/type/LevelCheckForm";

const DropdownLanguage = ({handleChange, value}) => {
  return(
    <>
      <label className="hidden" htmlFor="language" aria-hidden="true">Select a language</label>
        <select className="w-[85px] text-sm border-2 border-slate-600 rounded p-1" name="language" onChange={handleChange} id="language" value={value}>
          <option className="ml-2"value = "">Enter Language</option>
          <option className="ml-2"value="english">en</option>
          <option className="ml-2"value="chinese">ch</option>
          <option className="ml-2"value="korean">kr</option>
          <option className="ml-2"value="japanese">jp</option>
        </select>
    </>
  );

};
const LevelCheckPage = () => {
  const [inputData, setInputData] = useState<EnglishEntry | CjkEntry >(new EnglishEntry());
  const [language, setLanguage] = useState<Language | "">("");
  const [view, setView] = useState<"form" | "view">("form");

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

  const toggleView = () => {
    if(view !== "form") return setView("form");
    else { return setView("view");}
  };

  return (
    <div className="relative h-screen w-full bg-green-50 grid">
      <aside className="h-full bg-orange-50">
        {/* Mobile version */}
        <div className="hidden">
          <button>Open</button>
        </div>
        <div className="w-full max-w-[1100px] p-2 mx-auto flex justify-between items-center">
          <div className="flex flex-row items-center gap-2" id="nav-levelCheckForm">
            <div className="rounded-xl bg-dark-green px-3 py-1.5 text-slate-50"><button onClick={toggleView}>View</button></div>
            <div className="rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50">Save</div>
            <div className="rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50">Print</div>
          </div>
          <DropdownLanguage value ={language} handleChange={handleLanguageChange} />
        </div>


      </aside>
      <div>
        <section id="levelCheckForm" className={`${view !=="form" ? "hidden" : ""}`}>
          {language === "" && (
            <div className="mx-auto max-w-[1100px] w-full">
              <h1 className="text-center mt-6 text-2xl font-bold pb-4">Level Check Form</h1>
              <label className="hidden" htmlFor="language" aria-hidden="true">Select a language</label>
              <select className="w-[200px]text-md border-2 border-slate-600 rounded p-1" name="language" onChange={handleLanguageChange} id="language" value={language}>
                <option value = "">Enter Language</option>
                <option value="english">English</option>
                <option value="chinese">Chinese</option>
                <option value="korean">Korean</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>
          )}
          {language !== "" && <LevelCheckForm inputData={inputData} setInputData={setInputData} />}
        </section>

        <section id="levelCheckPage" className={`relative ${view !== "view" ? "hidden" : ""}`}>
          <div className="sticky top-0 h-screen w-full overflow-auto p-4">
            <div className="print-component-landscape">
              {language !== "" && inputData !== null && <PlotLevelCheck data={inputData} />}  
            </div>
          </div>
        </section>

      </div>
      
    </div>
  );
};

export default LevelCheckPage;
