import labelText from "../../assets/other/labelText.json";

const Comment = ({comment, language}) =>{
    const text = (phrase, language) => labelText[language]['SPR'][phrase];

    return(
        <div className="card">
            <div className="card-title">
                <strong><p className="uppercase">{text("comment", language)}</p></strong>
            </div>
            <div className = "card-description">
                <p className="comment">{comment}</p>
            </div>
        </div>
    )

}

export default Comment;