// src/pages/LevelCheckPage.tsx
import { useState } from "react";
import LevelCheckForm from "@/pages/LevelCheckPage/LevelCheckForm";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { Language } from "@/utils/common";
import { CjkEntry, EnglishEntry } from "@/type/LevelCheckForm";
import { Printer, Eye, Save } from "lucide-react";

type DropdownLanguageProps = {
handleChange:  ( e: React.ChangeEvent<HTMLSelectElement>) => void;
value: Language | "";
id: string;
className: string;
}
const DropdownLanguage: React.FC<DropdownLanguageProps> = ({id, className, handleChange, value}) => {
  return(
    <>
      <label className="hidden" htmlFor= {id} aria-hidden="true">Select a language</label>
      <select className="
                  w-[200px] text-sm border-2 border-slate-600 rounded p-1
                  " 
      name= {id}
      onChange={handleChange} 
      id={id} 
      value={value}>
        <option value = "">Select a Language</option>
        <option value="english">en</option>
        <option value="chinese">ch</option>
        <option value="korean">kr</option>
        <option value="japanese">jp</option>
      </select>
    </>
  );

};

const LevelCheckPage = () => {
  const [inputData, setInputData] = useState<EnglishEntry | CjkEntry >(new EnglishEntry());
  const [language, setLanguage] = useState<Language | "">("");
  const [view, setView] = useState<"form" | "view">("form");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
  const handlePrint = () => {
    return;
  };

  const handleSave = () => {
    return;
  };

  return (
    <div className="relative h-screen w-full bg-green-50 grid grid-rows-[auto_1fr]">
      <aside className="h-full bg-orange-50">
        {/* Mobile version */}
        <div className="hidden">
        </div>
        {/* Left Action */}

        <div className="w-full max-w-[1100px] p-2 mx-auto flex justify-between items-center">

          <div className="flex flex-row items-center gap-2" id="nav-levelCheckForm">
            <button 
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
              className="mr-1 rounded-xl border px-3 py-1.5 text-sm shadow-sm md:hidden">
                ☰
            </button>

            <button className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-blue-600 px-3 py-1.5 text-slate-50" onClick={toggleView}>
              <Eye /><span>{view === "view" ? "View" : "Form"}</span></button>
              <button className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50">
                <Save /><span>Save</span>
              </button>
              {view != "form" && (
              <button className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50">
              <Printer /><span>Print</span></button>

              )}
      
   
          </div>

          {/* Right Action */}
          <DropdownLanguage 
            id={"language"} 
            className={"md:block hidden w-[200px] text-sm border-2 border-slate-600 rounded p-1"} 
            value ={language} 
            handleChange={handleLanguageChange} />
        </div>
      </aside>

      {/* {Mobile Action drawer} */}

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 max-w-[85%] bg-white shadow-xl p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b pb-2">
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="rounded-md border px-2 py-1 text-sm"
              >
✕
              </button>
            </div>
            <button onClick={() => { toggleView(); setIsMenuOpen(false); }} className="rounded-xl bg-dark-green px-3 py-2 text-white">
              {view === "form" ? "Switch to View" : "Back to Form"}
            </button>
            <button onClick={() => { handleSave(); setIsMenuOpen(false); }} className="rounded-xl border px-3 py-2">
Save
            </button>
            <button onClick={() => { handlePrint(); setIsMenuOpen(false); }} className="rounded-xl border px-3 py-2">
Print
            </button>
          </div>
        </div>
      )}
      {/* Content */}
      <div className="">
        <section id="levelCheckForm" className={view !== "form" ? "hidden" : "block"}>
          {language === "" ? (
            <div className="mx-auto max-w-[700px]">
              <h1 className="text-center mt-4 text-2xl font-bold pb-4">Level Check Form</h1>
              <div className="flex justify-center">
                <DropdownLanguage id={"language"} className={"w-[200px] text-sm border-2 border-slate-600 rounded p-1"} value={language} handleChange={handleLanguageChange} />
              </div>
            </div>
          ) : (
            <div>
              <LevelCheckForm inputData={inputData} setInputData={setInputData} />
            </div>
          )}
        </section>

        <section id="levelCheckPage" className={`oveflow-auto relative ${view !== "view" ? "hidden" : ""}`}>
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
