import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import User from "../type/User";
import { editDataFromLocal, getDataFromLocal } from "../utils/functions";
import { Language } from "@/utils/common";

const LanguagePage = () => {
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

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center font-secondary">
          GEOS App
        </h1>
        <button className="btn-primary w-full" onClick={() => handleLanguageSelect("english")}>
          English
        </button>
        <button className="btn-primary w-full" onClick={() => handleLanguageSelect("chinese")}>
          Chinese
        </button>
        <button className="btn-primary w-full" onClick={() => handleLanguageSelect("korean")}>
          Korean
        </button>
        <button className="btn-primary w-full" onClick={() => handleLanguageSelect("japanese")}>
          Japanese
        </button>
      </div>
    </div>
  );
};

export default LanguagePage;
