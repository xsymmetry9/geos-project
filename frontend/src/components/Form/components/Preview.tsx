import labelText from "@/assets/other/labelText.json";
import { StudentProgressReportEntry } from "@/type/StudentProgressReportEntry";

type Language = keyof typeof labelText;

interface PreviewProps {
  inputData: StudentProgressReportEntry;
  language: Language;
}

const Preview: React.FC<PreviewProps> = ({inputData, language }) => {
  const { name, textbook, course, attendance, totalLessons, levels, feedback } =
    inputData;

  const titles: Record<Language, string[]> = {
    english: ["vocabulary", "grammar", "pronunciation", "listening", "conversation"],
    chinese: ["詞彙", "文法", "發音", "聽力", "會話"],
    korean: ["어휘", "문법", "발음", "듣기", "대화"],
    japanese: ["語彙", "文法", "発音", "聴解", "会話"]
  };
  const titleLanguage: Record<Language, string[]> = {
    english: ["Initial", "Target", "Final"],
    chinese: ["初始", "目標", "結束"],
    korean: ["초기", "목표", "결과"],
    japanese: ["初期", "目標", "終了"],
  };
  return (
    <div className="static preview-section">
      <div className="p-3" id="class-information">
        <h2 className="text-2xl font-bold text-center bg-dark-green capitalize text-white mb-6">{labelText[language].SPR["student_information"]}</h2>
        <p className="text-size-sm" >
          <strong className="capitalize">{labelText[language].form["input_name"]}:</strong> {name.length != 0 ? name : "No name"}
        </p>
        <p className="text-size-sm">
          <strong className="capitalize">{labelText[language].form["input_textbook"]}:</strong>{" "}
          {textbook.length != 0 ? textbook : "No textbook"}
        </p>
        <p className="text-size-sm">
          <strong className="capitalize">{labelText[language].form["input_course"]}:</strong>{" "}
          {course.length != 0 ? course : "No course name"}
        </p>
        <p className="text-size-sm">
          <strong className="capitalize">{labelText[language].form["input_attendance"]}:</strong>{" "}
          {attendance != 0 ? attendance : "No attendance"}
        </p>
        <p className="text-size-sm">
          <strong className="capitalize">{labelText[language].form["input_totallessons"]}</strong>{" "}
          {totalLessons != 0 ? totalLessons : "No total lessons"}
        </p>
      </div>
      <div className="p-3" id="student-evaluation">
        <h2 className="bg-dark-green text-2xl font-bold text-center capitalize text-white mb-6">{labelText[language].SPR["student_evaluation"]}</h2>
        <table className="table-fixed border-collapse w-full mx-auto">
          <thead>
            <tr className="bg-orange-700 text-white font-secondary text-sm">
              <th className="px-2 py-1"></th>
              <th className="px-2 py-1">{titleLanguage[language][0]}</th>
              <th className="px-2 py-1">{titleLanguage[language][1]}</th>
              <th className="px-2 py-1">{titleLanguage[language][2]}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(levels).map((item, index) => {
              const key = item as keyof StudentProgressReportEntry["levels"];
              return (
                <tr className="odd:bg-orange-50 even:bg-white" key={item}>
                  <td className="font-secondary text-sm capitalize px-2 py-1">{titles[language][index]}</td>
                  <td className="font-secondary text-sm text-center px-2 py-1">{levels[key].initial}</td>
                  <td className="font-secondary text-sm text-center px-2 py-1">{levels[key].target}</td>
                  <td className="font-secondary text-sm text-center px-2 py-1">{levels[key].final}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="preview-container pb-3">
        <h2 className="bg-dark-green text-white my-6 text-2xl font-bold capitalize text-center">{labelText[language].SPR["student_feedback"]}</h2>
        <div className="text-sm w-full border border-green-600 min-h-40 p-2">
          <p>{feedback || "No comment"}</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
