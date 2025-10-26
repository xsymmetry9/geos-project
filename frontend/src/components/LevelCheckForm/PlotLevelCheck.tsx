import { useMemo } from "react";
import { EnglishEntry, CjkEntry } from "@/type/LevelCheckForm";
import { format } from "date-fns";
import { levelCheckTranslation } from "@/utils/translation";

interface PlotProps { data: EnglishEntry | CjkEntry; }

const PlotLevelCheck: React.FC<PlotProps> = ({ data }) => {
  // Pick the current locale once per language change
  const text = useMemo(() => levelCheckTranslation(data.language), [data.language]);

  // Derive category keys from the chosen locale
  const categories = Object.keys(text.category) as Array<keyof typeof text.category>;

  const dateValue = data.dateCreated instanceof Date ? data.dateCreated : new Date(data.dateCreated);

  return (
    <div className="w-full px-12" id="print-preview">
      <div className="font-primary container" id="level-check-content">
        <div className="flex w-full justify-between pt-4">
          <div className="mt-3">
            <p className="ml-3 text-[14px]"><span className="capitalize font-bold">{text.name}: </span>{data.student_name}</p>
            <p className="ml-3 text-[14px]"><span className="capitalize font-bold">{text.date}: </span>{format(dateValue, "MM/dd/yyyy")}</p>
          </div>
          <h1 className="capitalize mt-6 text-center text-lg font-bold">{text.title}</h1>
          <img className="" width={120} height={60} src={"/logo.jpg"} alt={"Company Logo"} />
        </div>

        <div id="table-container">
          <table className="mt-1 h-[420px] w-[1026px] table-auto border-collapse border border-slate-600" id="table-content">
            <colgroup>
              <col className="w-[100px]" /><col className="w-[400px]" /><col className="w-[400px]" /><col className="w-[56px]" /><col className="w-[70px]" />
            </colgroup>
            <thead className="text-[15px]">
              <tr className="h-[30px] bg-teal-600 text-center font-bold text-white">
                <td className="capitalize border-r border-b border-slate-600">{text.category_title}</td>
                <td className="capitalize border-r border-b border-slate-600">{text.strength}</td>
                <td className="capitalize border-r border-b border-slate-600">{text.weakness}</td>
                <td className="capitalize border-r border-b border-slate-600 bg-orange-300 text-black">{text.score}</td>
                <td className="uppercase border-b border-slate-600 bg-orange-300 text-black">CEFR</td>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {categories.map((item) => (
                <tr key={item} className="h-[72px]">
                  <td className="w-[100px] border-r border-b border-black bg-teal-50 px-1 text-center font-bold capitalize">{text.category[item]}</td>
                  <td className="border-r border-b border-black bg-white px-1"><ul className=""></ul></td>
                  <td className="border-r border-b border-black bg-white px-1"><ul className=""></ul></td>
                  <td className="border-r border-b border-black bg-orange-50 px-1 text-center text-[15px]"></td>
                  <td className="border-b border-black bg-orange-50 px-1 text-center text-[15px]"></td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="mt-3 w-[1026px] table-auto border-collapse border border-black">
            <thead className="w-full text-[15px] font-bold text-white">
              <tr className="grid w-full grid-cols-[100px_1fr_125px] justify-self-center">
                <td className="capitalize border-r border-black bg-teal-600 p-1 text-center">{text.notes}</td>
                <td className="border-r border-black bg-teal-600 p-1"></td>
                <td className="capitalize bg-orange-300 p-1 text-center text-black">{text.level}</td>
              </tr>
            </thead>
            <tbody className="bg-white text-[15px]">
              <tr className="grid h-[155px] grid-cols-[1fr_125px] border-black">
                <td className="flex border-t border-black p-2 text-[15px]">{data.feedback}</td>
                <td className="grid grid-rows-[1fr_60px_1fr] border-t border-l border-black">
                  <p className="items-center bg-orange-50 pt-3 text-center text-[15px]">{data.overallCEFR}</p>
                  <p className="flex items-center justify-center capitalize border-t border-black bg-orange-300 p-2 text-center text-[13px] font-bold">{text.bookSuggestion}</p>
                  <p className={`border-t bg-orange-50 text-center ${data.bookRecommendation.length < 10 ? "pt-4 text-[15px]" : "pt-2 text-[11px]"} items-center`}>{data.bookRecommendation}</p>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default PlotLevelCheck;
