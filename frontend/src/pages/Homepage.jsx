import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Homepage = () =>{
    const {language} = useParams();

    const getLanguage = () =>{
        if(language == "kr") 
            return "korean";
        else if(language == "jp")
            return "japanese";
        else if(language == "ch")
            return "chinese";
        else {
            return "english"
        }
    }

    const title ={
        "english": "Teachers, welcome.",
        "chinese": "老師們，歡迎",
        "japanese": "先生方、ようこそ",
        "korean": "선생님들, 환영합니다",
    }

    return(
        <div className="content">
            <h1>{title[getLanguage()]}</h1>
            <div className="buttons-navigation-container">
                <Link className="btn-primary" to={`/spr/${getLanguage()}`}>SPR</Link>
                <Link className="btn-primary" to={`/levelcheck/${getLanguage()}`}>Level Check</Link>
            </div>
           
        </div>
    )
}

export default Homepage;