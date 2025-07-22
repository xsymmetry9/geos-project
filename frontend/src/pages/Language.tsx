import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

type LanguageOption = {
  label: string;
  value: string;
}
const languageOptions: LanguageOption[] = [
  {label: "English", value: "english"},
  {label: "中文", value: "chinese"},
  {label: "日本語", value: "japanese"},
  {label: "한국어", value: "korean"}
]
const LanguagePage = () => {
  let studentId = useParams().id
  const navigate = useNavigate();
  const [language, setLanguage] = useState("english");

  const languageHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setLanguage(value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    navigate(`/spr/${studentId}/${language}/create`,{state: {studentId: studentId, language: language}});
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4 max-w-sm w-full">
        <h3 className="text-2xl font-bold text-center font-secondary">
          Choose a language
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="language">
            <select name="language" className="bg-gray-100 border-2 border-dark-green rounded w-full p-2" id="language" onChange= {languageHandler} value={language}>
              <option className="" value="">Choose a language</option>
              {languageOptions.map((language) => 
                <option className="" key={language.label} value={language.value}>{language.label}</option> )}
            </select>
          </label>
          <input className="btn-primary w-full mt-6" type="submit" value={"create"} />
        </form>
      </div>
    </div>
  );
};

export default LanguagePage;
