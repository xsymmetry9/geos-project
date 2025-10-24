// src/pages/LevelCheckPage.tsx
import { useState } from "react";
import { LevelCheckForm, LevelCheckPlot } from "./LevelCheck";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { LevelCheckEntry } from "@/type/LevelCheckForm";

const LevelCheckPage = () => {
  const initiateForm = new LevelCheckEntry();
  const [inputData, setInputData] = useState<LevelCheckEntry>(initiateForm);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setInputData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative h-screen w-full bg-green-50 overflow-hidden min-[600px]:grid min-[600px]:grid-cols-[minmax(0,600px)_1fr]">
      {/* Sidebar (forms) — full screen under 600px; scrollable; capped to 600px on larger screens */}
      <aside className="h-full w-full max-w-[600px] overflow-y-auto bg-white max-[600px]:block min-[600px]:border-r-2 min-[600px]:border-slate-300">
        <div className="flex flex-col gap-2 p-4">
          <select className="border-2 border-slate-600 rounded p-1" name="language" onChange={handleLanguageChange} id="language" value={inputData.language ?? ""}>
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
            <option value="korean">Korean</option>
            <option value="japanese">Japanese</option>
          </select>
        </div>
        {inputData.language !== "" && <LevelCheckForm inputData={inputData} setInputData={setInputData} />}
      </aside>

      {/* Preview — hidden under 600px; sticky full-viewport on larger screens */}
      <section className="relative hidden min-[600px]:block">
        <div className="sticky top-0 h-screen w-full overflow-auto p-4">
          <div className="print-component-landscape">
            <PlotLevelCheck language={inputData.language} data={inputData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LevelCheckPage;
