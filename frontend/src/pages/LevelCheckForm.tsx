import { useEffect, useState } from "react";
import LevelCheckSelect from "../components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "../type/LevelCheckForm";

const LevelCheckForm = () => {
  const initiateForm = new LevelCheckEntry();
  const [inputData, setInputData] = useState<LevelCheckEntry>(initiateForm);
  const [error, setError] = useState<string>("");

   useEffect(() =>{
    const getUser = JSON.parse(localStorage.getItem("GEOS_app"));
    if(!getUser) return;
    
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget;
    setInputData((prev) => ({
      ...prev,
        [name]: value
    }));
  }

  return (
    <div className="w-full h-full max-w-[55em] mx-auto border px-3 py-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-secondary text-lg py-3">Oral Assessment Guidelines</h1>
      </div>
      <form autoComplete="off">
        <section>
          <h3>Personal Information</h3>
          {}
          <label htmlFor="student_name"> Student Name
            <input name="student_name" id="input-student_name" onChange={handleChange} type="text" />
          </label>
          <label htmlFor="feedback"> Feedback
            <textarea name="feedback" onChange={handleChange} id="input-feeback" />
          </label>
        </section>
        <section>
        <LevelCheckSelect item="speaking" inputData ={inputData} setInputData={setInputData} />
        {/* <LevelCheckSelect item="confidence" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="grammar" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="vocabulary" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="pronunciation" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="listening" inputData ={inputData} setInputData={setInputData} /> */}
        </section>
       
      </form>
      <div id="preview-level-check">
        {error && <p className="text-red">{error}</p>}
        <p>Form id: {inputData.id}</p>
        <p>Student Name: {inputData.student_name}</p>
        <p>Teacher's name: {inputData.teacher_name}</p>
        <p>Feedback: {inputData.feedback}</p>
        <h3>Level</h3>
        <p>Speaking</p>
        <p>Strength: {inputData.speaking.level_name}</p>
      </div>
    </div>
  );
};

export default LevelCheckForm;
