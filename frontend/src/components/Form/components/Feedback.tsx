import labelText from "@/assets/other/labelText.json";
import { Student } from "@/type/Student";
import { set } from "date-fns";
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
  setInputData: React.Dispatch<React.SetStateAction<Student>>;
  setInputError: React.Dispatch<React.SetStateAction<InputError>>;
  language: Language;
}

const maxFeedbackLength = {
  english: 425,
  chinese: 209,
  japanese: 240,
  korean: 300,
};

const Feedback: React.FC<FeedbackProps> = ({
  inputData,
  inputError,
  setInputError,
  setInputData,
  language,
}) => {
  const { feedback } = inputData;
  const [warning, setWarning] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const placeholderContent = {
    english: "Your comment",
    korean: "댓글이 여기에 작성됩니다",
    japanese: "コメントがここに入ります",
    chinese: "評論在此處輸入",
  };

  useEffect(() => {
    setCount(feedback.length); //includes spaces
  }, [feedback]);

  const handleInputData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() === "") {
      setInputError((prevError) => ({ ...prevError, feedback: true }));
      setWarning("Please fill up this section");
    } else if (value.length >= maxFeedbackLength[language]) {
      setInputError((prevError) => ({ ...prevError, feedback: true }));
      setWarning(`Too many characters (max ${maxFeedbackLength[language]})`);
    }
    setInputError((prevError) => ({ ...prevError, feedback: false }));
    setWarning("");
  };

  return (
    <>
      <h2 className="font-secondary bg-[#00646c] p-2 text-center text-xl font-bold text-white capitalize">
        {labelText[language].SPR["student_feedback"]}
      </h2>
      <div className="grid grid-cols-1 py-6" id="feedback">
        <textarea
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#09c5eb] sm:text-sm/6"
          rows={5}
          name="feedback"
          id="feedback"
          value={feedback}
          onChange={handleInputData}
          placeholder={placeholderContent[language]}
        ></textarea>
        <div className="mt-1 flex items-center justify-between">
          <div>{inputError.feedback && <p className="text-sm text-red-600">{warning}</p>}</div>
          <p className="text-right text-sm text-gray-500">
            {count}/{maxFeedbackLength[language]}
          </p>
        </div>
      </div>
    </>
  );
};

export default Feedback;
