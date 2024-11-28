import React, {useState, useEffect} from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Index from "./pages/Index.jsx";

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
            
                    <Index language = {language}/>
                
            </div>       
            <Footer language= {language} />

        </div>
    )
}

export default App;