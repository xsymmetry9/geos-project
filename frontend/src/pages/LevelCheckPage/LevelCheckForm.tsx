import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Save } from "lucide-react";
import { LevelCheckSelect, LevelCheckOverall } from "@/components/LevelCheckForm/LevelCheckSelect";
import { CjkLevelCheckSelect } from "@/components/LevelCheckForm/CjkLevelCheckSelect";
import { EnglishEntry, CjkEntry } from "@/type/LevelCheckForm";
import { levelCheckFormTranslation } from "@/utils/translation";
import { useUser } from "@/context/UserContext";
import labelText from "@/assets/other/labelText.json";
import { Language } from "@/utils/common";

type LevelCheckFormProps = {
  inputData: EnglishEntry | CjkEntry;
  setInputData: React.Dispatch<React.SetStateAction<EnglishEntry | CjkEntry>>;
  handleSave: () => void;
};

const LevelCheckForm = ({ inputData, setInputData, handleSave }: LevelCheckFormProps) => {
  const { user } = useUser();
  const appLanguage = (user?.language ?? "english") as Language;
  const text = levelCheckFormTranslation(inputData.language);
  const categoryKeys = Object.keys(text.category) as string[];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "dateCreated") {
      setInputData((prev) => ({
        ...prev,
        dateCreated: new Date(value),
      }));
      return;
    }

    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="level-check-form relative w-full">
      <div className="panel p-4 sm:p-6">
        <div className="level-check-form-body mx-auto w-full">
          <form
            autoComplete="off"
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <h1 className="level-check-form-title">{text.title}</h1>

            <section className="form-section" id="level-check-info">
              <div className="form-aspect">
                <div className="form-fields">
                  <label className="form-label" htmlFor="input-student_name">
                    <span className="form-label-text">{text.name}</span>
                    <input
                      className="form-field"
                      name="student_name"
                      id="input-student_name"
                      onChange={handleChange}
                      value={inputData.student_name}
                      type="text"
                    />
                  </label>

                  <label className="form-label" htmlFor="input-dateCreated">
                    <span className="form-label-text">{text.date}</span>
                    <input
                      type="date"
                      className="form-field"
                      name="dateCreated"
                      id="input-dateCreated"
                      value={format(new Date(inputData.dateCreated), "yyyy-MM-dd")}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </section>

            <section className="form-section level-check-levels" id="level-check-levels">
              {inputData.language === "english"
                ? categoryKeys.map((item) => (
                    <LevelCheckSelect
                      key={item}
                      item={item as any}
                      inputData={inputData}
                      setInputData={setInputData}
                    />
                  ))
                : categoryKeys.map((item) => (
                    <CjkLevelCheckSelect
                      key={item}
                      item={item as any}
                      inputData={inputData}
                      setInputData={setInputData}
                    />
                  ))}
            </section>

            <section className="form-section" id="level-check-feedback">
              <div className="form-aspect">
                <div className="form-fields level-check-notes">
                  <label className="form-label" htmlFor="bookRecommendation">
                    <span className="form-label-text">{text.bookRecommendation}</span>
                    <input
                      type="text"
                      name="bookRecommendation"
                      id="bookRecommendation"
                      value={inputData.bookRecommendation}
                      onChange={handleChange}
                      className="form-field"
                    />
                  </label>

                  <LevelCheckOverall
                    name={text.overallLevel}
                    item="overallLevel"
                    data={inputData}
                    handleChange={handleChange}
                  />

                  <label className="form-label" htmlFor="input-feedback">
                    <span className="form-label-text">{text.note}</span>
                    <textarea
                      className="form-textarea level-check-notes-textarea"
                      name="feedback"
                      id="input-feedback"
                      value={inputData.feedback}
                      onChange={(e) => {
                        if (e.currentTarget.value.length > 715) return;
                        handleChange(e);
                      }}
                    />
                    {inputData.feedback.length > 700 && (
                      <p className="form-error">You have reached the max. Text will overflow</p>
                    )}
                  </label>
                </div>
              </div>
            </section>

            <div className="flex justify-center border-t border-line pt-4">
              <button className="form-nav-btn form-nav-btn-save" type="submit">
                <Save size={16} aria-hidden="true" />
                <span>{labelText[appLanguage].save}</span>
              </button>
            </div>
            <div className="flex justify-center">
              <Link to="/home?view=levelCheck" className="level-check-cancel">
                {text.reset}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LevelCheckForm;
