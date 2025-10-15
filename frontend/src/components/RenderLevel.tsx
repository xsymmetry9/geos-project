import { getLevelInformationByLevel } from "@/utils/functions";
import labelText from "@/assets/other/labelText.json"

type Language = keyof typeof labelText;

interface RenderLevelInformationProps {
  category: string;
  studentLevel: string | number;
  language: Language;
}
const RenderLevelInformation: React.FC<RenderLevelInformationProps> = ({ category, studentLevel, language }) => {
  
  const fontSize = () => {
    if(language === "english") {
      return "text-sm/5";
    } else if(language === "chinese") {
      return "text-sm/5";
    } else {
      return "text-xs/5";
    }
  }
  const studentInfo = getLevelInformationByLevel({
    level: studentLevel,
    cat: category,
    lang: language
  })
  return (
    <>
      <p className={`ml-2 ${fontSize()}`}>{studentLevel !== "" ? studentInfo : ""}</p>
    </>
  );
};

export default RenderLevelInformation;
