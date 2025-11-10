// src/pages/LevelCheckPage/CreateLevelCheckForm.tsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LevelCheckForm from "@/pages/LevelCheckPage/LevelCheckForm";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { Language } from "@/utils/common";
import { CjkEntry, EnglishEntry } from "@/type/LevelCheckForm";
import { Eye, Save } from "lucide-react";
import SaveControl from "@/components/SaveControl";
import PrintControl from "@/components/PrintControl";

type DropdownLanguageProps = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: Language | "";
  id: string;
  className: string;
}
const DropdownLanguage: React.FC<DropdownLanguageProps> = ({ id, className, handleChange, value }) => {
  return (
    <>
      <label className="hidden" htmlFor={id} aria-hidden="true">Select a language</label>
      <select className={className}
        name={id}
        onChange={handleChange}
        id={id}
        value={value}>
        <option value="">Select a Language</option>
        <option value="english">en</option>
        <option value="chinese">ch</option>
        <option value="korean">kr</option>
        <option value="japanese">jp</option>
      </select>
    </>
  );
};

// --- Page ---------------------------------------------------------------------

const LevelCheckPage = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<EnglishEntry | CjkEntry>(new EnglishEntry());
  const [language, setLanguage] = useState<Language | "">("");
  const [view, setView] = useState<"form" | "view">("form");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState("");

  const componentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<null | (() => void)>(null);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setLanguage(value as Language);

    if (value === "english") {
      const initForm = new EnglishEntry();
      initForm.language = "english";
      setInputData(initForm);
    } else if (value) {
      const initForm = new CjkEntry();

      initForm.language = value;
      setInputData(initForm);
    }
  };

  const toggleView = () => setView((v) => (v === "form" ? "view" : "form"));

  const handlePrint = () => {
    return;
  };

  const handleSave = () => {

    if (error !== "") return;

    if (inputData === undefined) return setError("Submit failed: inputData is undefined.");

    console.log(inputData);

    const getUser = JSON.parse(localStorage.getItem("GEOS_app") || "{}");
    if (!getUser) return;

    const index = getUser.levelCheck.findIndex((item: any) => item.id === inputData.id);

    if (index !== -1) {
      getUser.levelCheck[index] = inputData;
    } else {
      getUser.levelCheck.push(inputData);
    }

    localStorage.setItem("GEOS_app", JSON.stringify(getUser));
    setIsMenuOpen(false);
    navigate(`/levelCheck/preview/${inputData.id}`, { replace: true, state: { data: inputData } });


  };

  return (
    <div className="w-full bg-slate-50 grid grid-rows-[auto_1fr]">
      {/* Top navigation bar */}
      <aside className="bg-white border-b sticky top-0 z-20">
        <div className="w-full max-w-[1100px] p-2 mx-auto flex justify-between items-center">
          {/* Left: actions */}
          <div className="flex flex-row items-center gap-2" id="nav-levelCheckForm">
            {/* Mobile burger */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
              className="mr-1 rounded-xl border px-3 py-1.5 text-sm shadow-sm md:hidden"
            >
              ☰
            </button>

            <button className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-blue-600 px-3 py-1.5 text-slate-50" onClick={toggleView}>
              <Eye /><span>{view === "view" ? "View" : "Form"}</span></button>
            <button
              type="button"
              onClick={handleSave}
              className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50">
              <Save /><span>Save</span>
            </button>

            {view != "form" && (
              <>
                <SaveControl
                  contentRef={componentRef}
                  className={"cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50"}
                  layout={"landscape"}
                  title={inputData.student_name} />
                <PrintControl
                  contentRef={componentRef}
                  className={"cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50"}
                  layout={"landscape"}
                />
              </>
            )}


          </div>

          {/* Right Action */}
          <DropdownLanguage
            id={"language"}
            className={"md:block hidden w-[200px] text-sm border-2 border-slate-600 rounded p-1"}
            value={language}
            handleChange={handleLanguageChange} />
        </div>
      </aside>

      {/* {Mobile Action drawer} */}

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 max-w-[85%] bg-white shadow-xl p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-base font-semibold">Actions</h3>
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
            {view === "view" && (
              <>
                <SaveControl
                  contentRef={componentRef}
                  className={"cursor-pointer flex items-center justify-center gap-2 rounded-xl border px-3 py-2 hover:bg-dark-green hover:text-white"}
                  layout={"landscape"}
                  title={inputData.student_name} />
                <PrintControl
                  contentRef={componentRef}
                  className={"cursor-pointer flex items-center justify-center gap-2 rounded-xl border px-3 py-2 hover:bg-dark-green hover:text-white"}
                  layout={"landscape"} />
              </>
            )}

          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto w-full max-w-[1100px] px-4 py-6">
        {/* FORM VIEW */}
        <section id="levelCheckForm" className={`${view !== "form" ? "hidden" : "block"}`}>
          {language === "" ? (
            <div className="h-screen flex flex-col items-center mx-auto max-w-[700px]">
              <h1 className="mt-4 text-2xl font-bold pb-4">Level Check Form</h1>
              <div className="mx-auto">
                <DropdownLanguage id={"language"} className={"w-[200px] text-sm border-2 border-slate-600 rounded p-1"} value={language} handleChange={handleLanguageChange} />
              </div>
            </div>
          ) : (
            <LevelCheckForm inputData={inputData} setInputData={setInputData} />
          )}
        </section>

        {/* READ-ONLY VIEW */}
        <section id="levelCheckPage" className={`relative ${view !== "view" ? "hidden" : "block"} `}>
          <div className="print-component-landscape" ref={componentRef}>
            {language !== "" && inputData && <PlotLevelCheck data={inputData} />}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LevelCheckPage;
