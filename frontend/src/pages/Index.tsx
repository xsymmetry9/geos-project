import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import User from "../type/User";
import { editDataFromLocal, getDataFromLocal } from "../utils/functions";

const Index = () => {
  const [user, setUser] = useState<User |null >(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const data = getDataFromLocal();
      if (data != null) {
        setUser(data);
      } else {
        const newUser = new User();
        editDataFromLocal(newUser);
        setUser(newUser);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLanguageSelect = (language: string) => {
    if(!user) return;

    const updatedUser = {... user, language};
    editDataFromLocal(updatedUser);
    setUser(updatedUser);
    navigate(`/home/${language}`);
  }

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="text-2xl py-2 font-secondary">Welcome to GEOS App {user ? user.name : "Teacher"}!!!</h1>
        <div className="bg-primary flex flex-col gap-1">
        <button className="btn-primary" onClick={() => handleLanguageSelect("english")}>
          English
        </button>
        <button className="btn-primary" onClick={() => handleLanguageSelect("chinese")}>
          Chinese
        </button>
        <button className="btn-primary" onClick={() => handleLanguageSelect("korean")}>
          Korean
        </button>
        <button className="btn-primary" onClick={() => handleLanguageSelect("japanese")}>
          Japanese
        </button>
      </div>
    </div>
  );
};

export default Index;
