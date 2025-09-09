import labelText from "@/assets/other/labelText.json";
import { useEffect, useState } from "react";

type Language = keyof typeof labelText;

interface InputData {
  feedback: string;
}

interface InputError {
  feedback?: boolean;
}

interface FeedbackProps {
  inputData: InputData;
  inputError: InputError;
  handleInputData: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  language: Language;
}

const Feedback: React.FC<FeedbackProps> = ({ inputData, inputError, handleInputData, language }) => {
  const { feedback } = inputData;
  const [count, setCount] = useState<number>(0);

  const placeholderContent = {
    english: "Your comment",
    korean: "댓글이 여기에 작성됩니다",
    japanese: "コメントがここに入ります",
    chinese: "評論在此處輸入",
  };

  useEffect(()=>{
    setCount(feedback.length); //includes spaces
  }, [feedback])

  return (
    <div>
      <h2 className="bg-[#00646c] text-xl text-white p-2 font-secondary font-bold capitalize text-center">{labelText[language].SPR["student_feedback"]}</h2>
      <p className="font-secondary text-gray-700 capitalize mt-2">
        <label htmlFor="">{placeholderContent[language]}</label>
      </p>
      <div className="grid grid-cols-1 mb-6" id="feedback">
        <textarea
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6"
          rows={5}
          name="feedback"
          id="feedback"
          value={feedback}
          onChange={handleInputData}
          placeholder={placeholderContent[language]}
        ></textarea>
        {feedback.trim() === ("") && inputError.feedback && <p className="text-red-600 text-sm">Please fill up this section</p>}
        {feedback.length > 475 && inputError.feedback && (<p className="text-red-600 text-sm">Too many characters (max 475)</p>)}
     

      </div>
    </div>
  );
};

export default Feedback;
