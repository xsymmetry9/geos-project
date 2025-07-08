import {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState} from "react";
import LevelCheck from "../type/LevelCheckForm.js";
import levelCheckData from "../assets/other/levelCheck.json";

const LevelCheckForm = () => {
  const [newForm, setNewForm] = useState<LevelCheck>();

  levelCheckData.english.speaking["A1-A2"].strength.forEach((item) => {
    console.log(item);
  });

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
