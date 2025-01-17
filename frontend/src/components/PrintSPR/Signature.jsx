import labelText from "../../assets/other/labelText.json";

const text = (phrase, language) => labelText[language]['SPR'][phrase];

const Signature = ({language}) =>{
    return(
        <div className="signature-section">
            <div className="card-title-no-border"><p className="upperCase">{text("signature", language)}</p></div>
            <div className="signature-line"id = "line"></div>
        </div>
    )
}

export default Signature;