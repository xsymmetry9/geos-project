import LanguageAspect from "./LanguageAspect";
import labelText from "../../../assets/other/labelText.json";
import { Student } from "@/type/Student";
import { SetStateAction, Dispatch } from "react";

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
  ];

  return (
    <section className="form-section">
      {englishAspects.map((aspectName) => (
        <LanguageAspect
          key={aspectName}
          aspectName={aspectName}
          inputData={inputData}
          inputError={inputError}
          handleLevelInput={handleLevelInputData}
          language={language}
        />
      ))}
    </section>
  );
};

export default LevelInformation;
