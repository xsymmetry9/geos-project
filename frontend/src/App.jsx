import React, {useState, useEffect} from "react";
import English from "./pages/English/Index.jsx";
import Japanese from "./pages/Japanese/Index.jsx";
import Korean from "./pages/Korean/Index.jsx";
import Chinese from "./pages/Chinese/Index.jsx";

const DEFAULT_LANGUAGE = "English"
const App = () =>{
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
        <>
            {language === "English" ? <English /> : 
                language === "Chinese" ? <Chinese /> :
                language === "Korean" ? <Korean /> :
                language ==="Japanese"? <Japanese /> : (<><h1>Error</h1></>)}

        
            <p>You clicked {number} times</p>

            <button onClick={() => setNumber(number + 1)}>Click</button>
            <button onClick={languageHandler} value={"English"}>English</button>
            <button onClick={languageHandler} value={"Chinese"}>Chinese</button>
            <button onClick={languageHandler} value={"Korean"}>Korean</button>
            <button onClick={languageHandler} value={"Japanese"}>Japanese</button>

        </>
    )
}

export default App;