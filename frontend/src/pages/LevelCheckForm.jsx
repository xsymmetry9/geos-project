import React, {useState} from "react";
import LevelCheck from "../type/LevelCheckForm.js";

const LevelCheckForm = () => {
  const [NewForm, setNewForm] = useState(new LevelCheck());

  const handleInputData = (e) =>{
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  }

  return(
    <div className="w-full max-w-[55em] mx-auto border py-6">
      <h1 className="font-primary text-2xl text-center py-3">Level Check form</h1>
      <form action="">
      <div className="grid grid-cols-1 gap-3 w-full max-w-lg mx-auto ">
        <label className="block" htmlFor="name">
          <span className="text-gray-700 capitalize">Name</span>
          <input
          type="text"
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
          name="name"
          value={NewForm.name}
          onChange={handleInputData}
        />
        </label>
        <label className="block" htmlFor="Proficiency Level">
          <span className="text-gray-700 capitalize">Proficiency Level</span>
          <input
          type="text"
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
          name="name"
          value={NewForm.name}
          onChange={handleInputData}
        />
        </label>
        <label className="block" htmlFor="name">
          <span className="text-gray-700 capitalize">Entry Textbook</span>
          <input
          type="text"
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
          name="name"
          value={NewForm.name}
          onChange={handleInputData}
        />
        </label>
        <label className="block" htmlFor="vocabulary">
          <span className="text-gray-700 capitalize">Vocabulary</span>
          <input
          type="text"
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
          name="name"
          value={NewForm.name}
          onChange={handleInputData}
        />
        </label>
        <label className="block" htmlFor="vocabulary">
          <span className="text-gray-700 capitalize">Pronunciation</span>
          <input
          type="text"
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
          name="name"
          value={NewForm.name}
          onChange={handleInputData}
        />
        </label>
        <label className="block" htmlFor="vocabulary">
          <span className="text-gray-700 capitalize">Grammar</span>
          <input
          type="text"
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
          name="name"
          value={NewForm.name}
          onChange={handleInputData}
        />
        </label>
        <label className="block" htmlFor="vocabulary">
          <span className="text-gray-700 capitalize">Listening</span>
          <input
          type="text"
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
          name="name"
          value={NewForm.name}
          onChange={handleInputData}
        />
        </label>
        <label className="block" htmlFor="vocabulary">
          <span className="text-gray-700 capitalize">Conversation</span>
          <input
          type="text"
          className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb] focus:outline-0"
          name="name"
          value={NewForm.name}
          onChange={handleInputData}
        />
        </label>
        </div>

      </form>


    </div>
  )
  
};

export default LevelCheckForm;
