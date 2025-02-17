import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
const Homepage = () =>{
    const [language, setLanguage] = useState();

    useEffect(() =>{
        const data = localStorage.getItem("SPR_App");
        if (data) {
            const parsedData = JSON.parse(data);
            setLanguage(parsedData.language);
        } else {
            setLanguage("english");
        }
    })

    const title ={
        "english": "Welcome Teachers",
        "chinese": "老師們，歡迎",
        "japanese": "先生方、ようこそ",
        "korean": "선생님들, 환영합니다",
    }

    return(
        <>
            <h1 className="center">{title[language]}</h1>
            <div className="buttons-navigation-container">
                <Link className="btn-primary" to={`/home/english`}>English</Link>
                <Link className="btn-primary" to={`/home/chinese`}>Chinese</Link>
                <Link className="btn-primary" to={`/home/korean`}>Korean</Link>
                <Link className="btn-primary" to={`/home/japanese`}>Japanese</Link>
            </div> 
        </>
    )
}

export default Homepage;