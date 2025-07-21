import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import User from "../type/User";
import { editDataFromLocal, getDataFromLocal } from "../utils/functions";
import { Language } from "@/utils/common";

const LanguagePage = () => {
  let studentId = useParams().id
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const data = getDataFromLocal();
      if (data) {
        const restoredUser = new User(data.name, data.language as Language);
        restoredUser.SPR = data.SPR;
        restoredUser.levelCheck = data.levelCheck;

        setUser(restoredUser);
      } else {
        const newUser = new User();
        editDataFromLocal(newUser);
        setUser(newUser);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLanguageSelect = (language: Language) => {
    if (!user) return;

    const updatedUser = { ...user, language };

    editDataFromLocal(updatedUser);
    setUser(updatedUser);
    navigate(`/home/${language}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4 max-w-sm w-full">
        <h3 className="text-2xl font-bold text-center font-secondary">
          Choose a language
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="language">SPR Form
            <select name="language" id="language">
              <option value="">Choose a language</option>
              <option value="english">English</option>
              <option value="chinese">Chinese</option>
              <option value="korean">Korean</option>
              <option value="japanese">Japanese</option>
            </select>
          </label>
          <input className="btn-primary w-full mt-6" type="submit" value={"create"} />
        </form>
      </div>
    </div>
  );
};

export default LanguagePage;
