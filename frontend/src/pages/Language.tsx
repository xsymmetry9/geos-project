import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Message from "../components/PopUpMessage";
import API_BASE_URL from "@/api/axiosInstance";

type LanguageOption = {
  label: string;
  value: string;
}
const languageOptions: LanguageOption[] = [
  {label: "English", value: "english"},
  {label: "中文", value: "chinese"},
  {label: "日本語", value: "japanese"},  {label: "한국어", value: "korean"}
]
const LanguagePage = () => {
  let studentId = useParams().id
  const navigate = useNavigate();
  const [language, setLanguage] = useState("english");
  const [message, setMessage] = useState("");

  const languageHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setLanguage(value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log("You clicked me");

    const addForm = async () => {
      try{
        const token = localStorage.getItem("token");
        if(!token) {
          setMessage("No token, login first to create a new token");
          return;
        }

        console.log("loaded token");

        const res = await axios.post(`${API_BASE_URL}/api/member/createSPR/${studentId}`,
              {studentId: studentId, language: language},
              {
                headers: { Authorization: `Bearer ${token}`},
        });

        const {data} = res.data;

        console.log(res);

        // setMessage(`You have created a new form.  Your id is: ${res.data.data.id}`);
        navigate(`/spr/${studentId}/${language}/create`,{state: 
          {
            formId: data.id,
            studentName: data.studentName,
            studentId: studentId, 
            language: language,
            dateCreated: data.dateCreated,
            teacherEmail: data.teacherEmail,
          }
        });

    } catch (error) {
      console.log("Error: ", error);
      setMessage("Error from the backend");
    }


    }
    addForm();


  }

  return (
    <div className="flex justify-center items-center w-full h-full relative">
      {message && (
        <div className="absolute bg-gray-100 top-0 w-86 text-center border border-2 p-2 rounded-md ">
          <p className="text-lg text-slate-700">{message}</p>
          <button className="mt-3 w-24 rounded-md border p-2 bg-blue-500 text-white" onClick={() => setMessage("")}>Ok</button>
        </div>
        )}
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
