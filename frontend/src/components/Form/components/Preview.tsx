import { format } from "date-fns";
import labelText from "@/assets/other/labelText.json";
import { Student } from "@/type/Student";

type Language = keyof typeof labelText;

interface PreviewProps {
  inputData: Student;
  language: Language;
}

const Preview: React.FC<PreviewProps> = ({ inputData, language }) => {
  const { name, textbook, course, attendance, totalLessons, levels, feedback, dateCreated } =
    inputData;
  const form = labelText[language].form;
  const spr = labelText[language].SPR;

  const infoRows = [
    {
      label: form.input_name,
      value: name.length != 0 ? name : form.no_name,
    },
    {
      label: spr.date,
      value: format(new Date(dateCreated), "MM/dd/yyyy"),
    },
    {
      label: form.input_textbook,
      value: textbook.length != 0 ? textbook : form.no_textbook,
    },
    {
      label: form.input_course,
      value: course.length != 0 ? course : form.no_course,
    },
    {
      label: form.input_attendance,
      value: attendance != 0 ? attendance : form.no_attendance,
    },
    {
      label: form.input_totallessons,
      value: totalLessons != 0 ? totalLessons : form.no_total_lessons,
    },
  ];

  return (
    <div id="preview-section" className="form-preview">
      <section className="form-preview-block">
        <h2 className="form-section-title">{spr.student_information}</h2>
        <dl className="form-preview-list">
          {infoRows.map((row) => (
            <div className="form-preview-row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="form-preview-block">
        <h2 className="form-section-title">{spr.student_evaluation}</h2>
        <table className="form-preview-table">
          <thead>
            <tr>
              <th></th>
              <th>{spr.initial}</th>
              <th>{spr.target}</th>
              <th>{spr.final}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(levels).map((item) => {
              const key = item as keyof Student["levels"];
              return (
                <tr key={item}>
                  <td className="capitalize">{spr[item]}</td>
                  <td className="text-center">{levels[key].initial}</td>
                  <td className="text-center">{levels[key].target}</td>
                  <td className="text-center">{levels[key].final}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="form-preview-block">
        <h2 className="form-section-title">{spr.student_feedback}</h2>
        <div className="form-preview-comment">{feedback || form.no_comment}</div>
      </section>
    </div>
  );
};

export default Preview;
