import {useState} from "react";
import levelCheckData from "../assets/other/levelCheck.json";

const entry = (id) => {
  this.id = id;
  this.name = "";
  this.teacher = "",
  this.speaking = {level_name: "", strength: "", weakness: ""};
  this.confidence = {level_name: "", strength: "", weakness: ""};
  this.vocabulary = {level_name: "", strength: "", weakness: ""};
  this.grammar = {level_name: "", strength:"", weakness: "";
    this.listening = {level_name: "", strength: "", weakness: ""};
    this.pronunciation = {level_name: "", strength: "", weakness: ""}
  }
}
const LevelCheckForm = () => {
  const [newForm, setNewForm] = useState<
    {
      id: string, 
      name: string, 
      teacher: string, 
      speaking: {level_name: string, strength: string, weakness: string}, 
      confidence: {level_name: string, strength: string, weakness: string}, 
      vocabulary: {level_name: string, strength: string, weakness: string},
      grammar: {level_name: string, strength: string, weakness: string},
      listening: {level_name: string, strength: string, weakness: string},
      pronunciation: {level_name: string, strength: string, weakness: string}}>(entry);


  levelCheckData.english.speaking["A1-A2"].strength.forEach((item) => {
    console.log(item);
  });

  console.log(newForm);

  return(
    <div className="w-full max-w-[55em] mx-auto border py-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-secondary text-lg py-3">Oral Assessment Guidelines</h1>
      </div>
      <form action="">
        <section>
          <h2>Speaking</h2>
          <label htmlFor="">CEFR Score
            <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" min="0" max="10" type="number" step={.5} id="score" />
          </label>
          <div>
            {/* Where the magic happens */
            }
          </div>
        </section>
              <section>
          <h2>Confidence</h2>
            <label htmlFor="">CEFR Score
            <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" min="0" max="10" type="number" step={.5} id="score" />
          </label>
        </section>
              <section>
          <h2>Vocabulary</h2>
            <label htmlFor="">CEFR Score
            <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" min="0" max="10" type="number" step={.5} id="score" />
          </label>
        </section>
              <section>
          <h2>Grammar</h2>
            <label htmlFor="">CEFR Score
            <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" min="0" max="10" type="number" step={.5} id="score" />
          </label>
        </section>
              <section>
          <h2>Listening</h2>
            <label htmlFor="">CEFR Score
            <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" min="0" max="10" type="number" step={.5} id="score" />
          </label>
        </section>
              <section>
          <h2>Pronunciation</h2>
            <label htmlFor="">CEFR Score
            <input className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" min="0" max="10" type="number" step={.5} id="score" />
          </label>
        </section>



      </form>


    </div>
  )
  
};

export default LevelCheckForm;
