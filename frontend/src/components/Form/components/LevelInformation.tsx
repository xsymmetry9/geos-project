<<<<<<< HEAD
import {useState} from "react";
import PropTypes from "prop-types";
=======
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
import LanguageAspect from "./LanguageAspect";
import DisplayHelp from "./DisplayHelp";
import labelText from "../../../assets/other/labelText.json"
import { Student } from "@/type/Student";
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
<<<<<<< HEAD

  const [displayHelp, setDisplayHelp] = useState(false);

  const titles = {
    english: [
=======
  const englishAspects: AspectName[] = [
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
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
<<<<<<< HEAD
        <div className="w-full flex justify-center">
          <button className="btn border border-blue-500 bg-blue-500 bg-white-500 mt-3 text-white hover:text-black hover:bg-white"
          onClick={() => setDisplayHelp(true)}
          aria-label="display-help">Learn CEFR Levels</button>
        </div>
        {displayHelp && <DisplayHelp language = {language} setDisplayHelp = {setDisplayHelp} />}

        {titles.english.map((aspectName) => {
=======
        {englishAspects.map((aspectName) => {
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
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
