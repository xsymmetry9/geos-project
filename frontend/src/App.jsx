import React, {useState, useEffect} from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Index from "./pages/Index.jsx";
import Student from "./type/student.js";
import Levels from "./type/levels.js";

const App = ({DEFAULT_LANGUAGE}) =>{
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
    const [data, setData] = useState(
        new Student(
            "DEFAULT_NAME",
            "COURSE_NAME",
            "BOOK_NAME",
            5,
            10,
             [new Levels("vocabulary", 1, 2, 3),
               new Levels("grammar", 1, 2, 3),
                new Levels("pronunciation",1 ,2, 3),
                new Levels("listening", 1, 2, 3),
                new Levels("conversation", 1, 2, 3)],
            "Your feedback."
        )
    );

    const handleData = (e) =>{
        const {name, value} = e.currentTarget;
        setData({ ...data, [name]: value});

        if(name == "attendance" || name == "totalLessons")
            console.log(value);

    }

    const languageHandler = (e) =>{
        console.log(e.currentTarget.value);
        setLanguage(e.currentTarget.value);
    }

    useEffect(() =>{
        document.title = `SPR - ${language}`;
    })
    return(
        <div className="app-root">
            <Header language={language} />
            <div className="content">
            
                    <Index data = {data} handleData = {handleData} language = {language}/>

            </div>       
            <Footer language= {language} />

        </div>
    )
}

export default App;