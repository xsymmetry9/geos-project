import { useState } from "react";
import LevelCheckSelect from "../components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "../type/LevelCheckForm";

const LevelCheckForm = () => {
  const initiateForm = new LevelCheckEntry();
  const [newForm, setNewForm] = useState<LevelCheckEntry>(initiateForm);

  return (
    <div className="w-full max-w-[55em] mx-auto border py-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-secondary text-lg py-3">Oral Assessment Guidelines</h1>
      </div>
      <form>
        <LevelCheckSelect item="speaking" newForm={newForm} setForm={setNewForm} />
        <LevelCheckSelect item="confidence" newForm={newForm} setForm={setNewForm} />
        <LevelCheckSelect item="grammar" newForm={newForm} setForm={setNewForm} />
        <LevelCheckSelect item="vocabulary" newForm={newForm} setForm={setNewForm} />
        <LevelCheckSelect item="pronunciation" newForm={newForm} setForm={setNewForm} />
        <LevelCheckSelect item="listening" newForm={newForm} setForm={setNewForm} />
      </form>
    </div>
  );
};

export default LevelCheckForm;
