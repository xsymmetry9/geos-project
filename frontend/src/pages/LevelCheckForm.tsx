import { useEffect, useState } from "react";
import LevelCheckSelect from "../components/LevelCheckForm/LevelCheckSelect";
import { LevelCheckEntry } from "../type/LevelCheckForm";
import { library } from "@fortawesome/fontawesome-svg-core";

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
          <div>
            <label htmlFor="student_name"> Student Name
              <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" name="student_name" id="input-student_name" onChange={handleChange} type="text" />
            </label>
          </div>
        </section>
        <section>
        <LevelCheckSelect item="speaking" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="confidence" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="grammar" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="vocabulary" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="pronunciation" inputData ={inputData} setInputData={setInputData} />
        <LevelCheckSelect item="listening" inputData ={inputData} setInputData={setInputData} />
        </section>
        <section id="input-feedback">
           <label htmlFor="feedback"> Feedback
            <textarea className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6" name="feedback"  onChange={handleChange} id="input-feeback" />
          </label>
        </section>
        <div className="w-full flex justify-center pt-3">
         <button className="btn-primary">
            Submit
          </button>
        </div>
   
       
      </form>

      <div className="" id="preview-level-check">
        {error && <p className="text-red">{error}</p>}
        <p>Form id: {inputData.id}</p>
        <p>date: {inputData.dateCreated}</p>
        <p>Student Name: {inputData.student_name}</p>
        <p>Feedback: {inputData.feedback}</p>
        <h3>Level</h3>
        <p>Speaking</p>
        <p>Level Name: {inputData.speaking.level_name}</p>
        <p>Strength</p>
        <ul>
          {inputData.speaking.strength.map((item) => <li>{item}</li>)}
        </ul>
        <p>Weakness</p>
        <ul>
          {inputData.speaking.weakness.map((item) => <li>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default LevelCheckForm;
