import { useState } from "react";

const Feedback = ({data, handleData, language}) =>{
    const {comment} = data;
    const placeholderContent = 
    {
        "english": "Comment goes here",
        "korean": "댓글이 여기에 작성됩니다",
        "japanese": "コメントがここに入ります",
        "chinese": "評論在此處輸入"
          
    }
    

    return(
        <>
            <div className='container'id="feedback">
                <textarea className="form-input-primary" name="comment" id="comment" value={comment} onChange={handleData} placeholder ={placeholderContent[language.toLowerCase()]}></textarea> 
            </div>
        </>
    )
}

export default Feedback;