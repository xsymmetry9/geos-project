import labelText from "@/assets/other/labelText.json";
import { Student } from "@/type/Student";
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
  english: 450,
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
  const form = labelText[language].form;
  const maxLength = maxFeedbackLength[language];

  const tooLongMessage = form.feedback_too_long.replace("{max}", String(maxLength));

  useEffect(() => {
    setCount(feedback.length);
  }, [feedback]);

  useEffect(() => {
    if (feedback.length > maxLength) {
      setInputError((prevError) => ({ ...prevError, feedback: true }));
      setWarning(tooLongMessage);
    } else if (feedback.trim() === "") {
      setInputError((prevError) => ({ ...prevError, feedback: true }));
      setWarning(form.feedback_required);
    } else {
      setInputError((prevError) => ({ ...prevError, feedback: false }));
      setWarning("");
    }
  }, [feedback, language, setInputError, maxLength, tooLongMessage, form.feedback_required]);

  const handleInputData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() === "") {
      setInputError((prevError) => ({ ...prevError, feedback: true }));
      setWarning(form.feedback_required);
      return;
    }

    if (value.length > maxLength) {
      setInputError((prevError) => ({ ...prevError, feedback: true }));
      setWarning(tooLongMessage);
      return;
    }

    setInputError((prevError) => ({ ...prevError, feedback: false }));
    setWarning("");
  };

  return (
    <section className="form-section" id="feedback">
      <div className="form-aspect">
        <textarea
          className="form-textarea"
          rows={8}
          name="feedback"
          id="feedback"
          value={feedback}
          onChange={handleInputData}
          placeholder={form.feedback_placeholder}
        />
        <div className="form-meta">
          <div>{inputError.feedback && <p className="form-error">{warning}</p>}</div>
          <p className="form-meta-count">
            {count}/{maxLength}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
