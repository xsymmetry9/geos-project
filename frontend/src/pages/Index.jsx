import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import User from "../type/User";
import { editDataFromLocal, getDataFromLocal } from "../utils/functions";

const LinksLanguages = () => {
  return (
    <div className="bg-primary flex flex-col gap-1">
      <Link className="btn-primary" to={"/home/english"}>
        English
      </Link>
      <Link className="btn-primary" to={"/home/chinese"}>
        Chinese
      </Link>
      <Link className="btn-primary" to={"/home/korean"}>
        Korean
      </Link>
      <Link className="btn-primary" to={"/home/japanese"}>
        Japanese
      </Link>
    </div>
  );
};
const Index = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const data = getDataFromLocal();
      if (data != null) {
        setUser(JSON.parse(data));
      } else {
        const newUser = new User();
        editDataFromLocal(newUser);
        setUser(newUser);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="text-2xl py-2 font-secondary">Welcome to GEOS App {user.name}!!!</h1>
      <LinksLanguages />
    </div>
  );
};

export default Index;
