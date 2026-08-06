import { format } from "date-fns";
import labelText from "../../../assets/other/labelText.json";

interface InputData {
  name: string;
  course: string;
  textbook: string;
  attendance: number;
  totalLessons: number;
  dateCreated: Date | string;
}

interface InputError {
  name?: boolean;
  course?: boolean;
  textbook?: boolean;
  attendance?: boolean;
  totalLessons: boolean;
}

type Language = keyof typeof labelText;

interface PersonalInformationProps {
  inputData: InputData;
  inputError: InputError;
  handleInputData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  language: Language;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  inputData,
  inputError,
  handleInputData,
  language,
}) => {
  const { name, course, textbook, attendance, totalLessons, dateCreated } = inputData;
  const form = labelText[language].form;
  const dateLabel = labelText[language].SPR.date;

  return (
    <section className="form-section" id="personal-information">
      <div className="form-aspect">
        <div className="form-fields">
          <label className="form-label" htmlFor="name">
            <span className="form-label-text">{form.input_name}</span>
            <input
              type="text"
              className="form-field"
              name="name"
              id="name"
              value={name}
              onChange={handleInputData}
            />
            {inputError.name && <p className="form-error">{form.missing_text}</p>}
          </label>

          <label className="form-label" htmlFor="dateCreated">
            <span className="form-label-text">{dateLabel}</span>
            <input
              type="date"
              className="form-field"
              name="dateCreated"
              id="dateCreated"
              value={format(new Date(dateCreated), "yyyy-MM-dd")}
              onChange={handleInputData}
            />
          </label>

          <label className="form-label" htmlFor="course">
            <span className="form-label-text">{form.input_course}</span>
            <select
              className="form-field"
              id="course"
              name="course"
              value={course}
              onChange={handleInputData}
            >
              <option value="">{form.select_course}</option>
              <option value="ONLINE">ONLINE</option>
              <option value="PL">PL</option>
              <option value="2PL">2PL</option>
              <option value="FLEX">FLEX</option>
              <option value="SGL">SGL</option>
              <option value="GL">GL</option>
              <option value="Company">Company</option>
            </select>
            {inputError.course && <p className="form-error">{form.missing_course}</p>}
          </label>

          <label className="form-label" htmlFor="textbook">
            <span className="form-label-text">{form.input_textbook}</span>
            <input
              className="form-field"
              type="text"
              name="textbook"
              id="textbook"
              value={textbook}
              onChange={handleInputData}
            />
            {inputError.textbook && <p className="form-error">{form.missing_textbook}</p>}
          </label>

          <label className="form-label" htmlFor="attendance">
            <span className="form-label-text">{form.input_attendance}</span>
            <input
              className="form-field"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="attendance"
              id="attendance"
              value={attendance === 0 ? "" : attendance}
              placeholder="0"
              onFocus={(e) => e.target.select()}
              onChange={handleInputData}
            />
            {inputError.attendance && <p className="form-error">{form.attendance_error}</p>}
          </label>

          <label className="form-label" htmlFor="totalLessons">
            <span className="form-label-text">{form.input_totallessons}</span>
            <input
              className="form-field"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="totalLessons"
              id="totalLessons"
              value={totalLessons === 0 ? "" : totalLessons}
              placeholder="0"
              onFocus={(e) => e.target.select()}
              onChange={handleInputData}
            />
            {inputError.totalLessons && <p className="form-error">{form.total_lessons_error}</p>}
          </label>
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
