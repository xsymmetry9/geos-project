import React, {useState} from "react";
import LevelCheck from "../type/LevelCheckForm.js";
import {
  LevelCheckInputData,
  LevelCheckInputAspectsData
} from "../components/LevelCheckForm/LevelCheckFormComponents.jsx"

const LevelCheckForm = () => {
  const [NewForm, setNewForm] = useState(new LevelCheck());

  const handleInputData = (e) =>{
    const { name, value } = e.target;
    setNewForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputLanguageAspectData = (e) =>{
    const {name, value} = e.target;
    setNewForm((prev) => ({ ...prev, 
      language_aspects: {
        ...prev.language_aspects,
        [name]: value
      }}))

  }

  return(
    <div className="w-full max-w-[55em] mx-auto border py-6">
      <div className="flex flex-col justify-center items-center">
        <img width={100} src="/logo.svg" alt="logo" />
        <h1 className="font-secondary text-lg py-3">Oral Assessment Guidelines</h1>
      </div>
      <form action="">
      <div className="grid grid-cols-1 gap-3 w-full max-w-lg mx-auto ">
        <LevelCheckInputData name={"name"} inputName = {"name"} data = {NewForm} handleData = {handleInputData}/>
        <LevelCheckInputData name={"proficiency level"} inputName = {"language_proficiency_level"} data = {NewForm} handleData ={handleInputData} />
        <LevelCheckInputData name={"Entry textbook"} inputName ={"textbook"} data={NewForm} handleData={handleInputData} />

        <LevelCheckInputAspectsData name={"Fluency and Coherence"} inputName={"fluency"} data={NewForm.language_aspects} handleData={handleInputLanguageAspectData} />
        <LevelCheckInputAspectsData name={"Confidence"} inputName={"confidence"} data={NewForm.language_aspects} handleData={handleInputLanguageAspectData} />
        <LevelCheckInputAspectsData name={"Speech and Pronuciation"} inputName={"pronunciation"} data={NewForm.language_aspects} handleData={handleInputLanguageAspectData} />
        <LevelCheckInputAspectsData name={"Complete Sentences & Phrases"} inputName={"complete_sentence"} data={NewForm.language_aspects} handleData={handleInputLanguageAspectData} />
        <LevelCheckInputAspectsData name={"Appropriate & Varied Vocabulary"} inputName={"varied_vocabulary"} data={NewForm.language_aspects} handleData={handleInputLanguageAspectData} />
        <LevelCheckInputAspectsData name={"Errors in Form and Function"} inputName={"errors_in_form"} data={NewForm.language_aspects} handleData={handleInputLanguageAspectData} />
        <LevelCheckInputAspectsData name={"Colloquial Expressions"} inputName={"colloquial_expressions"} data={NewForm.language_aspects} handleData={handleInputLanguageAspectData} />
        <LevelCheckInputAspectsData name={"Understanding of spoken English"} inputName={"listening"} data={NewForm.language_aspects} handleData={handleInputLanguageAspectData} />
        </div>

      </form>


    </div>
  )
  
};

export default LevelCheckForm;
