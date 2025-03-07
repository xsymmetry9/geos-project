import React, {useState} from "react";
import LevelCheck from "../type/LevelCheckForm.js";

const LevelCheckForm = () => {
  const [NewForm, setNewForm] = useState(new LevelCheck());

  return(
    <div className="w-full max-w-lg mx-auto border py-6">
      <h1 className="font-primary text-2xl text-center py-3">Level Check form</h1>
      <form action="">
        <label htmlFor="">
          <span className="font-primary text-md font-slate-700">Name</span>
          <input type="text" className="w-full" />
        </label>
      </form>
    </div>
  )
  
};

export default LevelCheckForm;
