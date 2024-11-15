import React, {useState, useEffect} from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import English from "./pages/English/Index.jsx";
import Japanese from "./pages/Japanese/Index.jsx";
import Korean from "./pages/Korean/Index.jsx";
import Chinese from "./pages/Chinese/Index.jsx";

const App = ({DEFAULT_LANGUAGE}) =>{
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
    const [number, setNumber] = useState(0);

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
                {
                    language === "English" ? <English /> : 
                    language === "Chinese" ? <Chinese /> :
                    language === "Korean" ? <Korean /> :
                    language ==="Japanese"? <Japanese /> : (<><h1>Error</h1></>)
                }
            </div>       
            <Footer language= {language} />

        </div>
    )
}

export default App;