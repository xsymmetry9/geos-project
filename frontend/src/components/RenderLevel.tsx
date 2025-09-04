import { getLevelInformationByLevel } from "../utils/functions";
import labelText from "../assets/other/labelText.json"

type Language = keyof typeof labelText;

interface RenderLevelInformationProps {
  category: string;
  studentLevel: string | number;
  language: Language;
}
const RenderLevelInformation: React.FC<RenderLevelInformationProps> = ({ category, studentLevel, language }) => {
  console.log(studentLevel === "");
  const studentInfo = getLevelInformationByLevel({
    level: studentLevel,
    cat: category,
    lang: language
  })
  return (
    <>
      <p>{studentLevel !== "" ? studentInfo : ""}</p>
    </>
  );
};

export default RenderLevelInformation;
