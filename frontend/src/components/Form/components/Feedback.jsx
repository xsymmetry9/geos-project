import { useState } from "react";

const Feedback = ({inputData, handleData, language}) =>{
    const {feedback} = inputData;
    const [inputFeedback, setInputFeedback] = useState(feedback);

    const handler = (e) =>{
        const {value} = e.currentTarget;
        setInputFeedback(value);
    }
    const placeholderContent = 
    {
        "english": "Comment goes here",
        "korean": "댓글이 여기에 작성됩니다",
        "japanese": "コメントがここに入ります",
        "chinese": "評論在此處輸入"
    }
    
    return(
        <div className="form-primary">
            <p className="text-2" ><label htmlFor="">{placeholderContent[language]}</label></p>
            <div className= "input-wrapper" id="feedback">
                <textarea name="feedback" id="feedback" value={inputFeedback} onChange= {handler} placeholder = {placeholderContent[language.toLowerCase()]}></textarea> 
            </div>
        </div>
    )
}

export default Feedback;