import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LevelCheckSelect, LevelCheckOverall } from "@/components/LevelCheckForm/LevelCheckSelect";
import { EnglishEntry, CjkEntry } from "@/type/LevelCheckForm";
import "@/styles/printLevelCheck.css";
import { levelCheckFormTranslation } from "@/utils/translation";

import { format } from "date-fns";
import { CjkLevelCheckSelect } from "@/components/LevelCheckForm/CjkLevelCheckSelect";

interface FormProps {
  inputData: EnglishEntry | CjkEntry | null;
  setInputData: React.Dispatch<React.SetStateAction<EnglishEntry | CjkEntry | null>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface CommentProps {
  setInputData: React.Dispatch<React.SetStateAction<EnglishEntry | CjkEntry>>;
  className: string;
  name: string;
  id: string;
  value: string;
}

const Comment: React.FC<CommentProps> = ({ className, name, setInputData, id, value }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    if (value.length > 715) {
      setMessage("You have reached the max.  Text will overflow");
    } else {
      setMessage("");
      setInputData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <>
      <textarea className={className} name={name} onChange={handleChange} id={id} value={value} />
      <p className="text-sm text-red-600">{message}</p>
    </>
  );
};
const Form: React.FC<FormProps> = ({ inputData, setInputData, handleChange, handleSubmit, handleSave }) => {
  if (inputData === null) return <p>Loading...</p>;
  const text = levelCheckFormTranslation(inputData.language);

  return (
    <div className="font-secondary panel mx-auto h-full w-full max-w-[50em] px-4 py-6 sm:px-6">
      <div className="mt-2 flex flex-col items-center justify-center">
        <h1 className="capitalize py-3 text-2xl font-bold text-ink">{text.title}</h1>
      </div>
      <form autoComplete="off">
        <section className="px-1 py-4">
          <div className="p-1">
            <label htmlFor="student_name">
              <span className="capitalize text-md font-semibold text-muted">{text.name}:</span>
              <input
                className="form-field"
                name="student_name"
                id="input-student_name"
                onChange={handleChange}
                value={inputData.student_name}
                type="text"
              />
            </label>
          </div>
          <div className="p-1">
            <label htmlFor="dateCreated">
              <span className="capitalize text-md font-semibold text-muted">{text.date}:</span>
              <input
                type="date"
                className="form-field"
                name="dateCreated"
                id="input-dateCreated"
                value={format(inputData.dateCreated, "yyyy-MM-dd")}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>
        <section className="px-1 py-4">
          <h2 className="form-section-title text-lg">{text.levelTitle}</h2>
          {inputData.language === "english" ? (
            <>
              {Object.keys(text.category).map((item) => (
                <LevelCheckSelect
                  key={item}
                  item={item as any}
                  inputData={inputData}
                  setInputData={setInputData} />
              ))
              }
            </>
          ) : (
            <>
              {Object.keys(text.category).map((item) => (
                <CjkLevelCheckSelect
                  key={item}
                  item={item as any}
                  inputData={inputData}
                  setInputData={setInputData} />
              ))}
            </>
          )
          }
        </section>
        <section className="px-1 py-4" id="input-feedback">
          <h2 className="form-section-title text-lg">{text.finalNotes}</h2>
          <div className="mt-6">
            <label className="capitalize text-md font-semibold text-muted" htmlFor="bookRecommendation">
              {text.bookRecommendation}:
              <input
                type="text"
                name="bookRecommendation"
                id="bookRecommendation"
                value={inputData.bookRecommendation}
                onChange={handleChange}
                className="form-field mb-2 font-normal"
              />
            </label>
            <LevelCheckOverall
              name={text.overallLevel}
              item="overallLevel"
              data={inputData}
              handleChange={handleChange}
            />
            <label htmlFor="feedback">
              <span className="capitalize text-md font-semibold text-muted">{text.note}:</span>
              <Comment
                className="mt-1 block h-[200px] w-full rounded-xl bg-white px-3 py-2 text-base text-ink outline-2 outline-line placeholder:text-muted focus:outline-2 focus:-outline-offset-2 focus:outline-active sm:text-sm/6"
                name="feedback"
                setInputData={setInputData}
                id="input-feedback"
                value={inputData.feedback}
              />
            </label>
          </div>
        </section>
        <div className="flex w-full justify-center gap-3 pt-3">
          <button className="btn-primary" onClick={handleSave} type="button">Save</button>
          <Link to="/" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
type LevelCheckFormProps = {
  inputData?: EnglishEntry | CjkEntry;
  setInputData?: React.Dispatch<React.SetStateAction<EnglishEntry | CjkEntry>>;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
};
const LevelCheckForm = ({ inputData, setInputData, handleSave }: LevelCheckFormProps) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const getUser = () => {
      const raw = localStorage.getItem("GEOS_app");
      const result = raw ? JSON.parse(raw) : null;

      if (result === null) return;
      return result;
    };
    const user = getUser();
    if (user !== null) {
      user.levelCheck.push(inputData); // Adds new form
      setLoading(false);
      // Creates new user
    } else {
      console.log("It' wasn't loaded well");
    }
  }, []);

  !loading && <p>Loading ...</p>;

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

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (error !== "") return;
  //   if (inputData === undefined) return setError("Submit failed: inputData is undefined.");

  //   const getUser = JSON.parse(localStorage.getItem("GEOS_app") || "{}");
  //   if (!getUser) return;

  //   const index = getUser.levelCheck.findIndex((item: any) => item.id === inputData.id);

  //   if (index !== -1) {
  //     getUser.levelCheck[index] = inputData;
  //   } else {
  //     getUser.levelCheck.push(inputData);
  //   }

  //   localStorage.setItem("GEOS_app", JSON.stringify(getUser));
  //   navigate(`/levelCheck/preview/${inputData.id}`, { replace: true, state: { data: inputData } });
  // };

  if (inputData === null || inputData === undefined) return;

  return (
    <>
      {inputData != null && (
        <Form
          inputData={inputData}
          setInputData={setInputData}
          handleChange={handleChange}
          // handleSubmit={handleSubmit}
          handleSave={handleSave}
        />
      )}
    </>
  );
};
export default LevelCheckForm;