import { useState } from "react";

const Feedback = () =>{
    const [comment, setComment] = useState("");
    const handler = (e) =>{
        setComment(e.currentTarget.value);
    }
    return(
        <>
            <div className='container'id="feedback">
                <textarea name="comment" id="comment" value={comment} onChange={handler} placeHolder ="Comment goes here"></textarea> 
            </div>
        </>
    )
}

export default Feedback;