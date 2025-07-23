import LanguageAspect from "./LanguageAspect";
import DisplayHelp from "./DisplayHelp";
import labelText from "../../../assets/other/labelText.json"
import { Student } from "@/type/StudentProgressReportEntry";
import { SetStateAction, Dispatch, ChangeEvent } from "react";

type Language = keyof typeof labelText;
type AspectName = keyof Student["levels"];
interface InputError {
  [key: string]: boolean;
}
interface LevelInformationProps {
  inputData: Pick<Student, "levels">;
  inputError: InputError;
  setInputData: Dispatch<SetStateAction<Student>>;
  handleLevelInputData: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  language: Language;
}
const LevelInformation: React.FC<LevelInformationProps> = ({
  inputData,
  inputError,
  handleLevelInputData,
  language,
}) => {
  const englishAspects: AspectName[] = [
      "vocabulary",
      "grammar",
      "pronunciation",
      "listening",
      "conversation",
  ]
  const titles: Record<Language, string[]> = {
    english: englishAspects,
    chinese: ["詞彙", "文法", "發音", "聽力", "會話"],
    korean: ["어휘", "문법", "발음", "듣기", "대화"],
    japanese: ["語彙", "文法", "発音", "聴解", "会話"],
  };

  return (
    <>
      {/* <LevelTabs titles={titles[language.toLowerCase()]} handlerPage = {handlerPage} currentPage = {page}/> */}
      <div className="pb-[3rem] relative">
        <h2 className="bg-[#00646c] text-xl text-white p-2 font-bold capitalize text-center">{labelText[language].SPR["student_level"]}</h2>
        {englishAspects.map((aspectName) => {
          return (
              <LanguageAspect
                key={aspectName}
                aspectName={aspectName}
                inputData={inputData}
                inputError = {inputError}
                handleLevelInput={handleLevelInputData}
                language={language}
              />
          );
        })}
      </div>
    </>
  );
};

export default LevelInformation;
